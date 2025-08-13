<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id',
        'parent_id',
        'content',
        'likes_count',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    // Relationships
    public function post()
    {
        return $this->belongsTo(CommunityPost::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parent()
    {
        return $this->belongsTo(CommunityComment::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(CommunityComment::class, 'parent_id');
    }

    public function likes()
    {
        return $this->hasMany(CommunityLike::class, 'comment_id');
    }

    // Scopes
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeTopLevel($query)
    {
        return $query->whereNull('parent_id');
    }
}