<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogCategory;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Trends',
                'description' => 'Latest trends in green building and sustainable architecture',
                'color' => '#10B981',
                'sort_order' => 1,
            ],
            [
                'name' => 'Technology',
                'description' => 'Innovative technologies for sustainable building',
                'color' => '#059669',
                'sort_order' => 2,
            ],
            [
                'name' => 'Design',
                'description' => 'Design principles and architectural insights',
                'color' => '#047857',
                'sort_order' => 3,
            ],
            [
                'name' => 'Finance',
                'description' => 'Financial aspects of green building projects',
                'color' => '#065f46',
                'sort_order' => 4,
            ],
            [
                'name' => 'Materials',
                'description' => 'Sustainable building materials and products',
                'color' => '#064e3b',
                'sort_order' => 5,
            ],
            [
                'name' => 'Case Studies',
                'description' => 'Real-world green building project examples',
                'color' => '#022c22',
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }
    }
}