<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DesignController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\WithdrawalController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CommunityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/resend-verification', [AuthController::class, 'resendVerification']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Public design routes
Route::get('/designs', [DesignController::class, 'index']);
Route::get('/designs/{id}', [DesignController::class, 'show']);
Route::get('/featured-designs', [DesignController::class, 'featured']);
Route::get('/newest-designs', [DesignController::class, 'newest']);
Route::get('/categories', [DesignController::class, 'categories']);

// Public blog routes
Route::get('/blog/posts', [BlogController::class, 'index']);
Route::get('/blog/posts/{slug}', [BlogController::class, 'show']);
Route::get('/blog/categories', [BlogController::class, 'categories']);
Route::get('/blog/featured', [BlogController::class, 'featured']);

// Public community routes
Route::get('/community/posts', [CommunityController::class, 'posts']);
Route::get('/community/posts/{id}', [CommunityController::class, 'show']);
Route::get('/community/categories', [CommunityController::class, 'categories']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
    
    // User profile routes
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::post('/profile/avatar', [UserController::class, 'uploadAvatar']);
    Route::get('/dashboard/stats', [UserController::class, 'dashboardStats']);
    
    // Design management routes (for designers)
    Route::middleware('designer')->group(function () {
        Route::post('/designs', [DesignController::class, 'store']);
        Route::put('/designs/{id}', [DesignController::class, 'update']);
        Route::delete('/designs/{id}', [DesignController::class, 'destroy']);
        Route::get('/my-designs', [DesignController::class, 'myDesigns']);
    });
    
    // Order routes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}/pay', [OrderController::class, 'processPayment']);
    Route::get('/purchases', [OrderController::class, 'purchases']);
    Route::get('/sales', [OrderController::class, 'sales']); // For designers
    
    // Cart routes
    Route::get('/cart', [OrderController::class, 'cart']);
    Route::post('/cart/add', [OrderController::class, 'addToCart']);
    Route::put('/cart/update', [OrderController::class, 'updateCart']);
    Route::delete('/cart/remove/{designId}', [OrderController::class, 'removeFromCart']);
    Route::delete('/cart/clear', [OrderController::class, 'clearCart']);
    
    // Review routes
    Route::get('/designs/{id}/reviews', [ReviewController::class, 'index']);
    Route::post('/designs/{id}/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
    
    // Message routes
    Route::get('/conversations', [MessageController::class, 'conversations']);
    Route::post('/conversations', [MessageController::class, 'createConversation']);
    Route::get('/conversations/{id}', [MessageController::class, 'show']);
    Route::post('/conversations/{id}/messages', [MessageController::class, 'sendMessage']);
    Route::put('/conversations/{id}/read', [MessageController::class, 'markAsRead']);
    
    // Community routes
    Route::post('/community/posts', [CommunityController::class, 'store']);
    Route::post('/community/posts/{id}/comments', [CommunityController::class, 'addComment']);
    Route::post('/community/posts/{id}/like', [CommunityController::class, 'likePost']);
    Route::post('/community/comments/{id}/like', [CommunityController::class, 'likeComment']);
    
    // Withdrawal routes (for designers)
    Route::middleware('designer')->group(function () {
        Route::get('/withdrawals', [WithdrawalController::class, 'index']);
        Route::post('/withdrawals', [WithdrawalController::class, 'store']);
        Route::get('/withdrawals/{id}', [WithdrawalController::class, 'show']);
        Route::get('/balance', [WithdrawalController::class, 'balance']);
    });
    
    // Download routes
    Route::get('/designs/{id}/download', [DesignController::class, 'download']);
    Route::get('/orders/{id}/download/{fileId}', [OrderController::class, 'downloadFile']);
    
    // Secure file download
    Route::get('/secure-download/{type}/{id}', [DesignController::class, 'secureDownload']);
});

// Admin routes (if needed)
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/designs/pending', [DesignController::class, 'pendingApproval']);
    Route::post('/designs/{id}/approve', [DesignController::class, 'approve']);
    Route::post('/designs/{id}/reject', [DesignController::class, 'reject']);
    Route::get('/withdrawals/pending', [WithdrawalController::class, 'pendingWithdrawals']);
    Route::post('/withdrawals/{id}/approve', [WithdrawalController::class, 'approve']);
    Route::post('/withdrawals/{id}/reject', [WithdrawalController::class, 'reject']);
});