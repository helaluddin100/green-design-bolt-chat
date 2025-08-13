<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('design_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_id')->constrained()->onDelete('cascade');
            $table->string('filename');
            $table->string('original_name');
            $table->string('path');
            $table->string('url');
            $table->string('mime_type');
            $table->integer('size'); // in bytes
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->enum('type', ['main', 'gallery', 'thumbnail', 'floor_plan'])->default('gallery');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
            
            $table->index(['design_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('design_images');
    }
};