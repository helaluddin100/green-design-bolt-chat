<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'user_type' => 'required|in:buyer,designer',
            'currency' => 'nullable|in:USD,KES',
            'country' => 'nullable|string|size:2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'user_type' => $request->user_type,
                'currency' => $request->currency ?? 'USD',
                'country' => $request->country,
            ]);

            // Generate and send verification code
            $verificationCode = $user->generateEmailVerificationCode();
            
            // Send email with verification code
            try {
                Mail::raw(
                    "Your GreenBuild verification code is: {$verificationCode}\n\nThis code will expire in 15 minutes.",
                    function ($message) use ($user) {
                        $message->to($user->email)
                               ->subject('GreenBuild - Email Verification Code');
                    }
                );
            } catch (\Exception $e) {
                // Log email error but don't fail registration
                \Log::error('Failed to send verification email: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Registration successful! Please check your email for verification code.',
                'data' => [
                    'user' => $user,
                    'verification_required' => true,
                ],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email_or_username' => 'required|string',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check if input is email or username
        $field = filter_var($request->email_or_username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $user = User::where($field, $request->email_or_username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'success' => true,
                'message' => 'Please verify your email address',
                'data' => [
                    'verification_required' => true,
                ],
            ]);
        }

        if ($user->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Account is not active',
            ], 403);
        }

        $user->update(['last_active_at' => now()]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user(),
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'success' => true,
                'message' => 'Password reset link sent to your email',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to send reset link',
        ], 500);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'message' => 'Password reset successfully',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to reset password',
        ], 500);
    }

    public function resendVerification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Email already verified',
            ], 400);
        }

        $verificationCode = $user->generateEmailVerificationCode();
        
        // Send email with verification code
        try {
            Mail::raw(
                "Your GreenBuild verification code is: {$verificationCode}\n\nThis code will expire in 15 minutes.",
                function ($message) use ($user) {
                    $message->to($user->email)
                           ->subject('GreenBuild - Email Verification Code');
                }
            );
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send verification email',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Verification code sent successfully',
        ]);
    }

    public function verifyEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|size:6',
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'success' => true,
                'message' => 'Email already verified',
            ]);
        }

        if ($user->verifyEmailWithCode($request->code)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            
            return response()->json([
                'success' => true,
                'message' => 'Email verified successfully',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid or expired verification code',
        ], 400);
    }
}