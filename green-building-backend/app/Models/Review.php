<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'design_id',
        'user_id',
        'order_id',
        'rating',
        'comment',
        'images',
        'is_verified_purchase',
        'is_approved',
        'approved_at',
    ];

    protected $casts = [
        'images' => 'array',
        'is_verified_purchase' => 'boolean',
        'is_approved' => 'boolean',
        'approved_at' => 'datetime',
    ];

    // Relationships
    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Scopes
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified_purchase', true);
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::created(function ($review) {
            $review->design->updateRating();
            $review->design->designer->updateRating();
        });

        static::updated(function ($review) {
            $review->design->updateRating();
            $review->design->designer->updateRating();
        });

        static::deleted(function ($review) {
            $review->design->updateRating();
            $review->design->designer->updateRating();
        });
    }
}