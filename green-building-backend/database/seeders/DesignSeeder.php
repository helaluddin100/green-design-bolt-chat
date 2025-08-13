<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Design;
use App\Models\DesignImage;
use App\Models\DesignFile;
use App\Models\User;
use App\Models\Category;

class DesignSeeder extends Seeder
{
    public function run(): void
    {
        $designers = User::where('user_type', 'designer')->get();
        $categories = Category::all();

        $designs = [
            [
                'title' => 'The Eco Haven',
                'description' => 'A stunning eco-friendly home design featuring sustainable materials and energy-efficient systems.',
                'price' => 299.00,
                'original_price' => 399.00,
                'bedrooms' => 4,
                'bathrooms' => 3,
                'garages' => 2,
                'floors' => 2,
                'square_feet' => 240.00,
                'green_features' => ['Solar Ready', 'Energy Star', 'LEED Certified'],
                'certifications' => ['Energy Star', 'LEED Gold'],
                'tags' => ['modern', 'eco-friendly', 'solar', 'energy-efficient'],
                'status' => 'approved',
                'is_featured' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Modern Green Villa',
                'description' => 'Luxury meets sustainability in this modern villa with cutting-edge green technology.',
                'price' => 449.00,
                'original_price' => 549.00,
                'bedrooms' => 5,
                'bathrooms' => 4,
                'garages' => 3,
                'floors' => 2,
                'square_feet' => 320.00,
                'green_features' => ['Geothermal', 'Smart Home', 'Rainwater Collection'],
                'certifications' => ['LEED Platinum', 'Passive House'],
                'tags' => ['luxury', 'villa', 'smart-home', 'geothermal'],
                'status' => 'approved',
                'is_featured' => true,
                'is_new' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Sustainable Family Home',
                'description' => 'Perfect for growing families, this home combines comfort with environmental responsibility.',
                'price' => 199.00,
                'original_price' => 249.00,
                'bedrooms' => 3,
                'bathrooms' => 2,
                'garages' => 2,
                'floors' => 1,
                'square_feet' => 180.00,
                'green_features' => ['Solar Panels', 'Energy Efficient', 'Eco Materials'],
                'certifications' => ['Energy Star'],
                'tags' => ['family', 'affordable', 'single-story'],
                'status' => 'approved',
                'published_at' => now(),
            ],
        ];

        foreach ($designs as $designData) {
            $design = Design::create([
                'user_id' => $designers->random()->id,
                'category_id' => $categories->random()->id,
                ...$designData
            ]);

            // Create sample images
            $imageUrls = [
                'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
            ];

            foreach ($imageUrls as $index => $url) {
                DesignImage::create([
                    'design_id' => $design->id,
                    'filename' => "image_{$index}.jpg",
                    'original_name' => "Design Image {$index + 1}",
                    'path' => "designs/{$design->id}/images/image_{$index}.jpg",
                    'url' => $url,
                    'mime_type' => 'image/jpeg',
                    'size' => 1024000,
                    'width' => 800,
                    'height' => 600,
                    'type' => 'gallery',
                    'sort_order' => $index,
                    'is_primary' => $index === 0,
                ]);
            }

            // Create sample files
            DesignFile::create([
                'design_id' => $design->id,
                'filename' => 'architectural_plans.pdf',
                'original_name' => 'Architectural Plans.pdf',
                'path' => "designs/{$design->id}/files/architectural_plans.pdf",
                'url' => "#",
                'mime_type' => 'application/pdf',
                'size' => 5120000,
                'type' => 'pdf',
                'description' => 'Complete architectural drawings and specifications',
            ]);
        }
    }
}