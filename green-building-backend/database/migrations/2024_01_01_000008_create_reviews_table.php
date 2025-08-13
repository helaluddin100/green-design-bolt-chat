<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            
            $table->integer('rating'); // 1-5 stars
            $table->text('comment')->nullable();
            $table->json('images')->nullable(); // Review images
            
            $table->boolean('is_verified_purchase')->default(true);
            $table->boolean('is_approved')->default(true);
            $table->timestamp('approved_at')->nullable();
            
            $table->timestamps();
            
            // Prevent duplicate reviews
            $table->unique(['design_id', 'user_id', 'order_id']);
            $table->index(['design_id', 'is_approved']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};