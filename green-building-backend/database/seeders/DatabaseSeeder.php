<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            BlogCategorySeeder::class,
            CommunityCategorySeeder::class,
            PaymentMethodSeeder::class,
            UserSeeder::class,
            DesignSeeder::class,
            BlogPostSeeder::class,
        ]);
    }
}