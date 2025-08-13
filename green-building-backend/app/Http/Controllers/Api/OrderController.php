<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Design;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', auth()->id())
                     ->with(['items.design.images'])
                     ->orderBy('created_at', 'desc')
                     ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.design_id' => 'required|exists:designs,id',
            'items.*.quantity' => 'required|integer|min:1',
            'billing_address' => 'required|array',
            'billing_address.first_name' => 'required|string|max:255',
            'billing_address.last_name' => 'required|string|max:255',
            'billing_address.email' => 'required|email',
            'billing_address.phone' => 'nullable|string',
            'billing_address.address' => 'required|string',
            'billing_address.city' => 'required|string',
            'billing_address.state' => 'required|string',
            'billing_address.zip_code' => 'required|string',
            'billing_address.country' => 'required|string',
            'payment_method' => 'required|string',
            'currency' => 'required|in:USD,KES',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            $subtotal = 0;
            $orderItems = [];

            // Calculate totals and prepare order items
            foreach ($request->items as $item) {
                $design = Design::findOrFail($item['design_id']);
                $quantity = $item['quantity'];
                $itemTotal = $design->price * $quantity;
                $subtotal += $itemTotal;

                $orderItems[] = [
                    'design_id' => $design->id,
                    'designer_id' => $design->user_id,
                    'design_title' => $design->title,
                    'plan_number' => $design->plan_number,
                    'price' => $design->price,
                    'quantity' => $quantity,
                    'total' => $itemTotal,
                    'commission_rate' => 70.00, // 70% to designer
                ];
            }

            $taxRate = 0.08; // 8% tax
            $taxAmount = $subtotal * $taxRate;
            $totalAmount = $subtotal + $taxAmount;

            // Create order
            $order = Order::create([
                'user_id' => auth()->id(),
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $request->payment_method,
                'billing_address' => $request->billing_address,
                'status' => 'pending',
                'payment_status' => 'pending',
            ]);

            // Create order items
            foreach ($orderItems as $itemData) {
                $order->items()->create($itemData);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'data' => $order->load(['items.design']),
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $order = Order::where('user_id', auth()->id())
                     ->with(['items.design.images', 'items.designer'])
                     ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    public function processPayment(Request $request, $id)
    {
        $order = Order::where('user_id', auth()->id())->findOrFail($id);

        if ($order->payment_status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'Order already paid',
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'payment_details' => 'required|array',
        ]);

        // Validate based on payment method
        if ($order->payment_method === 'card') {
            $validator->addRules([
                'payment_details.card_number' => 'required|string',
                'payment_details.expiry_date' => 'required|string',
                'payment_details.cvv' => 'required|string',
                'payment_details.card_name' => 'required|string',
            ]);
        } elseif ($order->payment_method === 'mpesa') {
            $validator->addRules([
                'payment_details.phone_number' => 'required|string',
            ]);
        }

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Process payment based on method
            $paymentResult = $this->processPaymentByMethod($order, $request->payment_details);

            if ($paymentResult['success']) {
                $order->update([
                    'payment_status' => 'paid',
                    'status' => 'completed',
                    'payment_id' => $paymentResult['transaction_id'],
                    'payment_details' => $request->payment_details,
                    'paid_at' => now(),
                ]);

                // Update designer earnings
                foreach ($order->items as $item) {
                    $designer = $item->designer;
                    $earnings = ($item->total * $item->commission_rate) / 100;
                    $designer->increment('balance', $earnings);
                    $designer->increment('total_earnings', $earnings);
                    $designer->increment('total_sales');
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Payment processed successfully',
                    'data' => [
                        'order' => $order->fresh(['items.design']),
                        'transaction_id' => $paymentResult['transaction_id'],
                    ],
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => $paymentResult['message'],
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function initiateMpesaPayment(Request $request, $id)
    {
        $order = Order::where('user_id', auth()->id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|string|regex:/^254[0-9]{9}$/',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid phone number format',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Convert USD to KES for M-Pesa payment
            $amountKES = $order->total_amount * 130; // Exchange rate

            // Initiate M-Pesa STK Push
            $mpesaResult = $this->initiateMpesaSTKPush($request->phone_number, $amountKES, $order->order_number);

            if ($mpesaResult['success']) {
                $order->update([
                    'payment_details' => [
                        'phone_number' => $request->phone_number,
                        'checkout_request_id' => $mpesaResult['checkout_request_id'],
                        'amount_kes' => $amountKES,
                    ]
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'M-Pesa payment initiated. Please check your phone.',
                    'data' => [
                        'checkout_request_id' => $mpesaResult['checkout_request_id'],
                        'amount' => $amountKES,
                    ],
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => $mpesaResult['message'],
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'M-Pesa payment initiation failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function checkPaymentStatus($id)
    {
        $order = Order::where('user_id', auth()->id())->findOrFail($id);

        if ($order->payment_method === 'mpesa' && isset($order->payment_details['checkout_request_id'])) {
            $status = $this->checkMpesaPaymentStatus($order->payment_details['checkout_request_id']);
            
            if ($status['success'] && $status['result_code'] === '0') {
                $order->markAsPaid();
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'payment_status' => $order->payment_status,
                    'mpesa_status' => $status,
                ],
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'payment_status' => $order->payment_status,
            ],
        ]);
    }

    // Cart methods
    public function cart()
    {
        $cartItems = session()->get('cart', []);
        $designs = Design::whereIn('id', array_keys($cartItems))
                        ->with(['images', 'user'])
                        ->get()
                        ->map(function ($design) use ($cartItems) {
                            $design->quantity = $cartItems[$design->id];
                            return $design;
                        });

        return response()->json([
            'success' => true,
            'data' => $designs,
        ]);
    }

    public function addToCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'design_id' => 'required|exists:designs,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $cart = session()->get('cart', []);
        $cart[$request->design_id] = $request->quantity;
        session()->put('cart', $cart);

        return response()->json([
            'success' => true,
            'message' => 'Item added to cart',
        ]);
    }

    public function updateCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'design_id' => 'required|exists:designs,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $cart = session()->get('cart', []);
        $cart[$request->design_id] = $request->quantity;
        session()->put('cart', $cart);

        return response()->json([
            'success' => true,
            'message' => 'Cart updated',
        ]);
    }

    public function removeFromCart($designId)
    {
        $cart = session()->get('cart', []);
        unset($cart[$designId]);
        session()->put('cart', $cart);

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart',
        ]);
    }

    public function clearCart()
    {
        session()->forget('cart');

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared',
        ]);
    }

    private function processPaymentByMethod($order, $paymentDetails)
    {
        switch ($order->payment_method) {
            case 'card':
                return $this->processStripePayment($order, $paymentDetails);
            case 'paypal':
                return $this->processPayPalPayment($order, $paymentDetails);
            case 'mpesa':
                return $this->processMpesaPayment($order, $paymentDetails);
            default:
                return ['success' => false, 'message' => 'Invalid payment method'];
        }
    }

    private function processStripePayment($order, $paymentDetails)
    {
        // Stripe payment processing logic
        // This is a mock implementation
        return [
            'success' => true,
            'transaction_id' => 'stripe_' . uniqid(),
            'message' => 'Payment processed successfully'
        ];
    }

    private function processMpesaPayment($order, $paymentDetails)
    {
        // M-Pesa payment processing logic
        return [
            'success' => true,
            'transaction_id' => 'mpesa_' . uniqid(),
            'message' => 'M-Pesa payment processed successfully'
        ];
    }

    private function processPayPalPayment($order, $paymentDetails)
    {
        // PayPal payment processing logic
        return [
            'success' => true,
            'transaction_id' => 'paypal_' . uniqid(),
            'message' => 'PayPal payment processed successfully'
        ];
    }

    private function initiateMpesaSTKPush($phoneNumber, $amount, $accountReference)
    {
        // M-Pesa STK Push implementation
        // This would integrate with Safaricom's M-Pesa API
        return [
            'success' => true,
            'checkout_request_id' => 'ws_CO_' . uniqid(),
            'message' => 'STK Push initiated successfully'
        ];
    }

    private function checkMpesaPaymentStatus($checkoutRequestId)
    {
        // Check M-Pesa payment status
        // This would query Safaricom's API
        return [
            'success' => true,
            'result_code' => '0', // 0 means success
            'result_desc' => 'Payment completed successfully'
        ];
    }

    public function purchases(Request $request)
    {
        $purchases = Order::where('user_id', auth()->id())
                         ->where('payment_status', 'paid')
                         ->with(['items.design.images'])
                         ->orderBy('created_at', 'desc')
                         ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $purchases,
        ]);
    }

    public function sales(Request $request)
    {
        $sales = OrderItem::where('designer_id', auth()->id())
                         ->whereHas('order', function ($query) {
                             $query->where('payment_status', 'paid');
                         })
                         ->with(['order.user', 'design'])
                         ->orderBy('created_at', 'desc')
                         ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $sales,
        ]);
    }

    public function downloadFile(Request $request, $orderId, $fileId)
    {
        $order = Order::where('user_id', auth()->id())
                     ->where('payment_status', 'paid')
                     ->findOrFail($orderId);

        $designIds = $order->items->pluck('design_id');
        $file = \App\Models\DesignFile::whereIn('design_id', $designIds)
                                     ->findOrFail($fileId);

        $file->incrementDownloads();

        return response()->download(storage_path('app/public/' . $file->path));
    }
}