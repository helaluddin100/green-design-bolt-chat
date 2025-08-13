<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'designer_id',
        'design_id',
        'subject',
        'status',
        'last_message_at',
    ];

    protected $casts = [
        'last_message_at' => 'datetime',
    ];

    // Relationships
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function designer()
    {
        return $this->belongsTo(User::class, 'designer_id');
    }

    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function latestMessage()
    {
        return $this->hasOne(Message::class)->latest();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('buyer_id', $userId)
                    ->orWhere('designer_id', $userId);
    }

    // Methods
    public function getOtherParticipant($userId)
    {
        return $this->buyer_id == $userId ? $this->designer : $this->buyer;
    }

    public function markAsRead($userId)
    {
        $this->messages()
             ->where('sender_id', '!=', $userId)
             ->where('is_read', false)
             ->update(['is_read' => true, 'read_at' => now()]);
    }

    public function getUnreadCount($userId)
    {
        return $this->messages()
                    ->where('sender_id', '!=', $userId)
                    ->where('is_read', false)
                    ->count();
    }
}