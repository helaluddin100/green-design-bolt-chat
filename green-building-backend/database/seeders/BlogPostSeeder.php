<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\User;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $authors = User::where('user_type', 'designer')->get();
        $categories = BlogCategory::all();

        $posts = [
            [
                'title' => '2025 Green Building Trends: What to Expect',
                'excerpt' => 'Discover the latest innovations in sustainable architecture and how they\'re shaping the future of construction.',
                'content' => '<p>The green building industry continues to evolve rapidly, with 2025 bringing exciting new innovations...</p>',
                'featured_image' => 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
                'tags' => ['trends', 'innovation', 'sustainability'],
                'status' => 'published',
                'is_featured' => true,
                'read_time' => 8,
                'published_at' => now(),
            ],
            [
                'title' => 'Solar Panel Integration in Modern Home Design',
                'excerpt' => 'Learn how to seamlessly incorporate solar panels into your home design without compromising aesthetics.',
                'content' => '<p>Solar panel integration has become a crucial aspect of modern green building design...</p>',
                'featured_image' => 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
                'tags' => ['solar', 'technology', 'design'],
                'status' => 'published',
                'read_time' => 6,
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'The Economics of Green Building: ROI Analysis',
                'excerpt' => 'Understand the long-term financial benefits of investing in sustainable building practices.',
                'content' => '<p>Green building investments offer significant long-term returns through energy savings...</p>',
                'featured_image' => 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
                'tags' => ['economics', 'roi', 'investment'],
                'status' => 'published',
                'read_time' => 10,
                'published_at' => now()->subDays(5),
            ],
        ];

        foreach ($posts as $postData) {
            BlogPost::create([
                'user_id' => $authors->random()->id,
                'category_id' => $categories->random()->id,
                ...$postData
            ]);
        }
    }
}