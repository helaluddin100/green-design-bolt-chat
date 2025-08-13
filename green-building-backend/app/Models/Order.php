<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'status',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'payment_status',
        'payment_method',
        'payment_id',
        'payment_details',
        'billing_address',
        'promo_code',
        'promo_discount',
        'paid_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'promo_discount' => 'decimal:2',
        'payment_details' => 'array',
        'billing_address' => 'array',
        'paid_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (empty($order->order_number)) {
                $order->order_number = 'GH-' . date('Y') . '-' . str_pad(static::count() + 1, 6, '0', STR_PAD_LEFT);
            }
        });
    }

    // Scopes
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopePaid($query)
    {
        return $query->where('payment_status', 'paid');
    }

    // Methods
    public function markAsPaid()
    {
        $this->update([
            'payment_status' => 'paid',
            'status' => 'completed',
            'paid_at' => now(),
        ]);

        // Update designer earnings
        foreach ($this->items as $item) {
            $designer = $item->designer;
            $designer->increment('balance', $item->designer_earnings);
            $designer->increment('total_earnings', $item->designer_earnings);
            $designer->increment('total_sales');
        }
    }
}