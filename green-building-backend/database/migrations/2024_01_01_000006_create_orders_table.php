<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled', 'refunded'])->default('pending');
            
            // Pricing
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            
            // Payment
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->enum('payment_method', ['stripe', 'paypal', 'bank_transfer'])->nullable();
            $table->string('payment_id')->nullable();
            $table->json('payment_details')->nullable();
            
            // Billing information
            $table->json('billing_address');
            
            // Promo code
            $table->string('promo_code')->nullable();
            $table->decimal('promo_discount', 5, 2)->nullable();
            
            // Timestamps
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index('order_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};