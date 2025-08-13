<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Design;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    public function profile()
    {
        $user = auth()->user();
        
        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'expertise' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = auth()->user();
            $user->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => $user,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function uploadAvatar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'avatar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = auth()->user();
            
            // Delete old avatar
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Upload and resize new avatar
            $image = $request->file('avatar');
            $filename = 'avatar_' . $user->id . '_' . time() . '.' . $image->getClientOriginalExtension();
            $path = 'avatars/' . $filename;

            $img = Image::make($image);
            $img->resize(300, 300, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            Storage::disk('public')->put($path, $img->encode());

            $user->update(['avatar' => $path]);

            return response()->json([
                'success' => true,
                'message' => 'Avatar uploaded successfully',
                'data' => [
                    'avatar_url' => Storage::disk('public')->url($path),
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload avatar',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function dashboardStats()
    {
        $user = auth()->user();
        
        if ($user->isDesigner()) {
            $stats = [
                'total_designs' => $user->designs()->count(),
                'approved_designs' => $user->designs()->approved()->count(),
                'total_sales' => $user->total_sales,
                'total_earnings' => $user->total_earnings,
                'current_balance' => $user->balance,
                'total_views' => $user->designs()->sum('views'),
                'total_downloads' => $user->designs()->sum('downloads'),
                'average_rating' => $user->rating,
                'recent_sales' => OrderItem::where('designer_id', $user->id)
                                         ->whereHas('order', function ($query) {
                                             $query->where('payment_status', 'paid');
                                         })
                                         ->with(['order.user', 'design'])
                                         ->latest()
                                         ->limit(5)
                                         ->get(),
            ];
        } else {
            $stats = [
                'total_purchases' => Order::where('user_id', $user->id)
                                        ->where('payment_status', 'paid')
                                        ->count(),
                'total_spent' => Order::where('user_id', $user->id)
                                    ->where('payment_status', 'paid')
                                    ->sum('total_amount'),
                'active_downloads' => OrderItem::whereHas('order', function ($query) use ($user) {
                                                $query->where('user_id', $user->id)
                                                      ->where('payment_status', 'paid');
                                            })->count(),
                'recent_purchases' => Order::where('user_id', $user->id)
                                          ->with(['items.design.images'])
                                          ->latest()
                                          ->limit(5)
                                          ->get(),
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }
}