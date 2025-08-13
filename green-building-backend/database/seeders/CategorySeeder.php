<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Modern',
                'description' => 'Contemporary designs with clean lines and minimalist aesthetics',
                'icon' => 'building',
                'color' => '#10B981',
                'sort_order' => 1,
            ],
            [
                'name' => 'Traditional',
                'description' => 'Classic architectural styles with timeless appeal',
                'icon' => 'home',
                'color' => '#059669',
                'sort_order' => 2,
            ],
            [
                'name' => 'Contemporary',
                'description' => 'Current design trends with innovative features',
                'icon' => 'layers',
                'color' => '#047857',
                'sort_order' => 3,
            ],
            [
                'name' => 'Cottage',
                'description' => 'Cozy, charming homes with rustic appeal',
                'icon' => 'tree-pine',
                'color' => '#065f46',
                'sort_order' => 4,
            ],
            [
                'name' => 'Villa',
                'description' => 'Luxurious homes with spacious layouts',
                'icon' => 'castle',
                'color' => '#064e3b',
                'sort_order' => 5,
            ],
            [
                'name' => 'Tiny House',
                'description' => 'Compact, efficient living spaces',
                'icon' => 'home-modern',
                'color' => '#022c22',
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}