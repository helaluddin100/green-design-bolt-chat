<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('withdrawal_number')->unique();
            $table->decimal('amount', 10, 2);
            $table->decimal('fee', 10, 2)->default(0);
            $table->decimal('net_amount', 10, 2);
            
            $table->enum('method', ['bank_transfer', 'paypal'])->default('bank_transfer');
            $table->json('payment_details'); // Bank details or PayPal email
            
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled', 'failed'])->default('pending');
            $table->text('notes')->nullable();
            $table->string('transaction_id')->nullable();
            
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};