<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('design_id')->constrained()->onDelete('cascade');
            $table->foreignId('designer_id')->constrained('users')->onDelete('cascade');
            
            $table->string('design_title');
            $table->string('plan_number');
            $table->decimal('price', 8, 2);
            $table->integer('quantity')->default(1);
            $table->decimal('total', 8, 2);
            
            // Commission calculation
            $table->decimal('commission_rate', 5, 2)->default(70.00); // 70%
            $table->decimal('designer_earnings', 8, 2);
            $table->decimal('platform_fee', 8, 2);
            
            $table->timestamps();
            
            $table->index('order_id');
            $table->index('design_id');
            $table->index('designer_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};