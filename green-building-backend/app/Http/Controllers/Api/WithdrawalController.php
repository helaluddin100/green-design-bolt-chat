<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WithdrawalController extends Controller
{
    public function index(Request $request)
    {
        $withdrawals = Withdrawal::where('user_id', auth()->id())
                                ->orderBy('created_at', 'desc')
                                ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $withdrawals,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:25|max:' . auth()->user()->balance,
            'method' => 'required|in:bank_transfer,paypal',
            'payment_details' => 'required|array',
        ]);

        if ($request->method === 'bank_transfer') {
            $validator->addRules([
                'payment_details.account_holder_name' => 'required|string|max:255',
                'payment_details.bank_name' => 'required|string|max:255',
                'payment_details.account_number' => 'required|string|max:50',
                'payment_details.routing_number' => 'required|string|max:20',
            ]);
        } elseif ($request->method === 'paypal') {
            $validator->addRules([
                'payment_details.paypal_email' => 'required|email',
            ]);
        }

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->amount > auth()->user()->balance) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient balance',
            ], 400);
        }

        try {
            $withdrawal = Withdrawal::create([
                'user_id' => auth()->id(),
                'amount' => $request->amount,
                'method' => $request->method,
                'payment_details' => $request->payment_details,
                'status' => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal request submitted successfully',
                'data' => $withdrawal,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit withdrawal request',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $withdrawal = Withdrawal::where('user_id', auth()->id())->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $withdrawal,
        ]);
    }

    public function balance()
    {
        $user = auth()->user();
        
        $stats = [
            'current_balance' => $user->balance,
            'total_earnings' => $user->total_earnings,
            'total_sales' => $user->total_sales,
            'pending_withdrawals' => $user->withdrawals()->pending()->sum('amount'),
            'completed_withdrawals' => $user->withdrawals()->completed()->sum('amount'),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    public function pendingWithdrawals()
    {
        $withdrawals = Withdrawal::pending()
                                ->with('user')
                                ->orderBy('created_at', 'asc')
                                ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $withdrawals,
        ]);
    }

    public function approve($id)
    {
        $withdrawal = Withdrawal::findOrFail($id);
        $withdrawal->approve();

        return response()->json([
            'success' => true,
            'message' => 'Withdrawal approved and processing',
            'data' => $withdrawal,
        ]);
    }

    public function reject(Request $request, $id)
    {
        $withdrawal = Withdrawal::findOrFail($id);
        $withdrawal->cancel($request->reason);

        return response()->json([
            'success' => true,
            'message' => 'Withdrawal rejected',
            'data' => $withdrawal,
        ]);
    }
}