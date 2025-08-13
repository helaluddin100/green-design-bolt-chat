<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'email_verification_code',
        'email_verification_code_expires_at',
        'password',
        'phone',
        'company',
        'bio',
        'avatar',
        'user_type',
        'status',
        'currency',
        'country',
        'balance',
        'expertise',
        'rating',
        'total_reviews',
        'total_sales',
        'total_earnings',
        'last_active_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'email_verification_code_expires_at' => 'datetime',
        'password' => 'hashed',
        'expertise' => 'array',
        'balance' => 'decimal:2',
        'rating' => 'decimal:2',
        'total_earnings' => 'decimal:2',
        'last_active_at' => 'datetime',
    ];

    // Relationships
    public function designs()
    {
        return $this->hasMany(Design::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function buyerConversations()
    {
        return $this->hasMany(Conversation::class, 'buyer_id');
    }

    public function designerConversations()
    {
        return $this->hasMany(Conversation::class, 'designer_id');
    }

    public function withdrawals()
    {
        return $this->hasMany(Withdrawal::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'designer_id');
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? asset('storage/' . $this->avatar) : null;
    }

    // Scopes
    public function scopeDesigners($query)
    {
        return $query->where('user_type', 'designer');
    }

    public function scopeBuyers($query)
    {
        return $query->where('user_type', 'buyer');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Methods
    public function isDesigner()
    {
        return $this->user_type === 'designer';
    }

    public function isBuyer()
    {
        return $this->user_type === 'buyer';
    }

    public function isAdmin()
    {
        return $this->user_type === 'admin';
    }

    public function generateEmailVerificationCode()
    {
        $this->email_verification_code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $this->email_verification_code_expires_at = now()->addMinutes(15);
        $this->save();
        
        return $this->email_verification_code;
    }

    public function verifyEmailWithCode($code)
    {
        if ($this->email_verification_code === $code && 
            $this->email_verification_code_expires_at > now()) {
            $this->email_verified_at = now();
            $this->email_verification_code = null;
            $this->email_verification_code_expires_at = null;
            $this->save();
            return true;
        }
        return false;
    }

    public function updateRating()
    {
        $reviews = $this->designs()->with('reviews')->get()->pluck('reviews')->flatten();
        
        if ($reviews->count() > 0) {
            $this->rating = $reviews->avg('rating');
            $this->total_reviews = $reviews->count();
            $this->save();
        }
    }
}