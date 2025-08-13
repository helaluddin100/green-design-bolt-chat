<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('email_verification_code')->nullable();
            $table->timestamp('email_verification_code_expires_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->text('bio')->nullable();
            $table->string('avatar')->nullable();
            $table->enum('user_type', ['buyer', 'designer', 'admin'])->default('buyer');
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->string('currency', 3)->default('USD');
            $table->string('country', 2)->nullable();
            $table->decimal('balance', 10, 2)->default(0);
            $table->json('expertise')->nullable(); // For designers
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('total_reviews')->default(0);
            $table->integer('total_sales')->default(0);
            $table->decimal('total_earnings', 12, 2)->default(0);
            $table->timestamp('last_active_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};