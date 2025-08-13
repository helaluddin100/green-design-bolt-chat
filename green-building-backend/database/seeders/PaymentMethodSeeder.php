<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $paymentMethods = [
            // USD Payment Methods
            [
                'name' => 'Stripe',
                'code' => 'stripe',
                'currency' => 'USD',
                'country' => 'US',
                'fee_percentage' => 2.9,
                'fee_fixed' => 0.30,
                'config' => [
                    'public_key' => env('STRIPE_KEY'),
                    'secret_key' => env('STRIPE_SECRET'),
                ]
            ],
            [
                'name' => 'PayPal',
                'code' => 'paypal',
                'currency' => 'USD',
                'country' => 'US',
                'fee_percentage' => 3.49,
                'fee_fixed' => 0.49,
                'config' => [
                    'client_id' => env('PAYPAL_CLIENT_ID'),
                    'client_secret' => env('PAYPAL_CLIENT_SECRET'),
                ]
            ],
            
            // KES Payment Methods
            [
                'name' => 'M-Pesa',
                'code' => 'mpesa',
                'currency' => 'KES',
                'country' => 'KE',
                'fee_percentage' => 1.5,
                'fee_fixed' => 0,
                'config' => [
                    'consumer_key' => env('MPESA_CONSUMER_KEY'),
                    'consumer_secret' => env('MPESA_CONSUMER_SECRET'),
                    'business_shortcode' => env('MPESA_SHORTCODE'),
                    'passkey' => env('MPESA_PASSKEY'),
                ]
            ],
            [
                'name' => 'Airtel Money',
                'code' => 'airtel_money',
                'currency' => 'KES',
                'country' => 'KE',
                'fee_percentage' => 2.0,
                'fee_fixed' => 0,
                'config' => [
                    'client_id' => env('AIRTEL_CLIENT_ID'),
                    'client_secret' => env('AIRTEL_CLIENT_SECRET'),
                ]
            ],
            [
                'name' => 'Stripe Kenya',
                'code' => 'stripe_ke',
                'currency' => 'KES',
                'country' => 'KE',
                'fee_percentage' => 3.8,
                'fee_fixed' => 0,
                'config' => [
                    'public_key' => env('STRIPE_KEY'),
                    'secret_key' => env('STRIPE_SECRET'),
                ]
            ],
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::create($method);
        }
    }
}