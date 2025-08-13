<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Design;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function index(Request $request, $designId)
    {
        $reviews = Review::where('design_id', $designId)
                        ->approved()
                        ->with('user')
                        ->orderBy('created_at', 'desc')
                        ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ]);
    }

    public function store(Request $request, $designId)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Verify user purchased this design
        $order = Order::where('id', $request->order_id)
                     ->where('user_id', auth()->id())
                     ->where('payment_status', 'paid')
                     ->whereHas('items', function ($query) use ($designId) {
                         $query->where('design_id', $designId);
                     })
                     ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'You can only review designs you have purchased',
            ], 403);
        }

        // Check if already reviewed
        $existingReview = Review::where('design_id', $designId)
                               ->where('user_id', auth()->id())
                               ->where('order_id', $order->id)
                               ->first();

        if ($existingReview) {
            return response()->json([
                'success' => false,
                'message' => 'You have already reviewed this design',
            ], 409);
        }

        try {
            $reviewData = [
                'design_id' => $designId,
                'user_id' => auth()->id(),
                'order_id' => $order->id,
                'rating' => $request->rating,
                'comment' => $request->comment,
                'is_verified_purchase' => true,
            ];

            // Handle image uploads
            if ($request->hasFile('images')) {
                $imagePaths = [];
                foreach ($request->file('images') as $image) {
                    $path = $image->store('reviews', 'public');
                    $imagePaths[] = $path;
                }
                $reviewData['images'] = $imagePaths;
            }

            $review = Review::create($reviewData);

            return response()->json([
                'success' => true,
                'message' => 'Review submitted successfully',
                'data' => $review->load('user'),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit review',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $review = Review::where('user_id', auth()->id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $review->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Review updated successfully',
                'data' => $review->load('user'),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update review',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $review = Review::where('user_id', auth()->id())->findOrFail($id);

        try {
            $review->delete();

            return response()->json([
                'success' => true,
                'message' => 'Review deleted successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete review',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}