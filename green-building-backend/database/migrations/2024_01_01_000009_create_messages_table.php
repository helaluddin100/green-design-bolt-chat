<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('designer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('design_id')->nullable()->constrained()->onDelete('set null');
            $table->string('subject')->nullable();
            $table->enum('status', ['active', 'closed', 'archived'])->default('active');
            $table->timestamp('last_message_at')->nullable();
            $table->timestamps();
            
            $table->unique(['buyer_id', 'designer_id', 'design_id']);
            $table->index(['buyer_id', 'status']);
            $table->index(['designer_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};