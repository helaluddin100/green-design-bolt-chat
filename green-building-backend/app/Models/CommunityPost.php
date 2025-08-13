<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommunityPost extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'content',
        'tags',
        'status',
        'is_pinned',
        'views',
        'likes_count',
        'comments_count',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_pinned' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(CommunityCategory::class);
    }

    public function comments()
    {
        return $this->hasMany(CommunityComment::class, 'post_id');
    }

    public function likes()
    {
        return $this->hasMany(CommunityLike::class, 'post_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopePinned($query)
    {
        return $query->where('is_pinned', true);
    }
}