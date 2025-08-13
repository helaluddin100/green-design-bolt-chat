<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'currency',
        'country',
        'config',
        'is_active',
        'fee_percentage',
        'fee_fixed',
    ];

    protected $casts = [
        'config' => 'array',
        'is_active' => 'boolean',
        'fee_percentage' => 'decimal:2',
        'fee_fixed' => 'decimal:2',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForCurrency($query, $currency)
    {
        return $query->where('currency', $currency);
    }

    public function scopeForCountry($query, $country)
    {
        return $query->where('country', $country);
    }

    // Methods
    public function calculateFee($amount)
    {
        return ($amount * $this->fee_percentage / 100) + $this->fee_fixed;
    }
}