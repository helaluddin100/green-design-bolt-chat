<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'design_id',
        'designer_id',
        'design_title',
        'plan_number',
        'price',
        'quantity',
        'total',
        'commission_rate',
        'designer_earnings',
        'platform_fee',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'total' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'designer_earnings' => 'decimal:2',
        'platform_fee' => 'decimal:2',
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function designer()
    {
        return $this->belongsTo(User::class, 'designer_id');
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($orderItem) {
            // Calculate earnings and fees
            $commissionRate = $orderItem->commission_rate ?? 70.00;
            $orderItem->designer_earnings = ($orderItem->total * $commissionRate) / 100;
            $orderItem->platform_fee = $orderItem->total - $orderItem->designer_earnings;
        });
    }
}