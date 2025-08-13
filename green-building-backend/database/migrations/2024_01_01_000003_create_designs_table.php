<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('designs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('plan_number')->unique();
            $table->decimal('price', 8, 2);
            $table->decimal('original_price', 8, 2)->nullable();
            
            // House specifications
            $table->integer('bedrooms');
            $table->decimal('bathrooms', 3, 1);
            $table->integer('garages')->default(0);
            $table->integer('floors');
            $table->decimal('square_feet', 8, 2);
            $table->decimal('lot_size', 8, 2)->nullable();
            
            // Green features
            $table->json('green_features')->nullable();
            $table->json('certifications')->nullable(); // LEED, Energy Star, etc.
            
            // Status and visibility
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected', 'suspended'])->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_new')->default(true);
            $table->boolean('is_active')->default(true);
            
            // SEO and metadata
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('tags')->nullable();
            
            // Statistics
            $table->integer('views')->default(0);
            $table->integer('downloads')->default(0);
            $table->integer('favorites')->default(0);
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('total_reviews')->default(0);
            
            // Timestamps
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'is_active']);
            $table->index(['category_id', 'status']);
            $table->index(['user_id', 'status']);
            $table->index('published_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('designs');
    }
};