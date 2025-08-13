<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained('community_posts')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('community_comments')->onDelete('cascade');
            $table->text('content');
            $table->integer('likes_count')->default(0);
            $table->boolean('is_approved')->default(true);
            $table->timestamps();
            
            $table->index(['post_id', 'parent_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_comments');
    }
};