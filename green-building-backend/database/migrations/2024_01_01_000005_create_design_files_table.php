<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('design_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_id')->constrained()->onDelete('cascade');
            $table->string('filename');
            $table->string('original_name');
            $table->string('path');
            $table->string('url');
            $table->string('mime_type');
            $table->integer('size'); // in bytes
            $table->enum('type', ['pdf', 'dwg', 'zip', 'cad', 'other'])->default('pdf');
            $table->text('description')->nullable();
            $table->integer('download_count')->default(0);
            $table->timestamps();
            
            $table->index('design_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('design_files');
    }
};