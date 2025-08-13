<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'withdrawal_number',
        'amount',
        'fee',
        'net_amount',
        'method',
        'payment_details',
        'status',
        'notes',
        'transaction_id',
        'processed_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'fee' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'payment_details' => 'array',
        'processed_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($withdrawal) {
            if (empty($withdrawal->withdrawal_number)) {
                $withdrawal->withdrawal_number = 'WD-' . date('Y') . '-' . str_pad(static::count() + 1, 6, '0', STR_PAD_LEFT);
            }

            // Calculate fee (2.5%)
            $withdrawal->fee = $withdrawal->amount * 0.025;
            $withdrawal->net_amount = $withdrawal->amount - $withdrawal->fee;
        });
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    // Methods
    public function approve()
    {
        $this->update([
            'status' => 'processing',
            'processed_at' => now(),
        ]);

        // Deduct from user balance
        $this->user->decrement('balance', $this->amount);
    }

    public function complete($transactionId = null)
    {
        $this->update([
            'status' => 'completed',
            'transaction_id' => $transactionId,
            'processed_at' => now(),
        ]);
    }

    public function cancel($reason = null)
    {
        $this->update([
            'status' => 'cancelled',
            'notes' => $reason,
        ]);

        // Refund to user balance if it was already deducted
        if ($this->status === 'processing') {
            $this->user->increment('balance', $this->amount);
        }
    }
}