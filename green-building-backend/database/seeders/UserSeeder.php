<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@greenbuild.com',
            'password' => Hash::make('password'),
            'user_type' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create sample designers
        $designers = [
            [
                'first_name' => 'Sarah',
                'last_name' => 'Johnson',
                'email' => 'sarah@greenbuild.com',
                'password' => Hash::make('password'),
                'user_type' => 'designer',
                'bio' => 'Sustainable architecture expert with 15+ years of experience in green building design.',
                'expertise' => ['LEED Certification', 'Passive House Design', 'Solar Integration'],
                'rating' => 4.9,
                'total_reviews' => 127,
                'total_sales' => 45,
                'total_earnings' => 12500.00,
                'balance' => 2500.00,
                'email_verified_at' => now(),
            ],
            [
                'first_name' => 'Michael',
                'last_name' => 'Chen',
                'email' => 'michael@greenbuild.com',
                'password' => Hash::make('password'),
                'user_type' => 'designer',
                'bio' => 'LEED certified architect specializing in energy-efficient residential designs.',
                'expertise' => ['Energy Efficiency', 'Smart Homes', 'Sustainable Materials'],
                'rating' => 4.7,
                'total_reviews' => 89,
                'total_sales' => 32,
                'total_earnings' => 8900.00,
                'balance' => 1800.00,
                'email_verified_at' => now(),
            ],
        ];

        foreach ($designers as $designer) {
            User::create($designer);
        }

        // Create sample buyers
        $buyers = [
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
                'user_type' => 'buyer',
                'email_verified_at' => now(),
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'email' => 'jane@example.com',
                'password' => Hash::make('password'),
                'user_type' => 'buyer',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($buyers as $buyer) {
            User::create($buyer);
        }
    }
}