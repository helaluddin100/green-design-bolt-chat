<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('community_categories')->onDelete('cascade');
            $table->string('title');
            $table->longText('content');
            $table->json('tags')->nullable();
            $table->enum('status', ['active', 'hidden', 'reported'])->default('active');
            $table->boolean('is_pinned')->default(false);
            $table->integer('views')->default(0);
            $table->integer('likes_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['category_id', 'status']);
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_posts');
    }
};