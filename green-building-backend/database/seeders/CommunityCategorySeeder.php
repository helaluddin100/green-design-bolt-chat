<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CommunityCategory;

class CommunityCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'General Discussion',
                'description' => 'General topics about green building',
                'icon' => 'message-circle',
                'color' => '#10B981',
                'sort_order' => 1,
            ],
            [
                'name' => 'Design Help',
                'description' => 'Get help with your design projects',
                'icon' => 'help-circle',
                'color' => '#059669',
                'sort_order' => 2,
            ],
            [
                'name' => 'Show Your Work',
                'description' => 'Share your completed projects',
                'icon' => 'image',
                'color' => '#047857',
                'sort_order' => 3,
            ],
            [
                'name' => 'Q&A',
                'description' => 'Questions and answers about green building',
                'icon' => 'help-circle',
                'color' => '#065f46',
                'sort_order' => 4,
            ],
            [
                'name' => 'Marketplace',
                'description' => 'Buying and selling discussions',
                'icon' => 'shopping-cart',
                'color' => '#064e3b',
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $category) {
            CommunityCategory::create($category);
        }
    }
}