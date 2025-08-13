<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Design extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'plan_number',
        'price',
        'original_price',
        'bedrooms',
        'bathrooms',
        'garages',
        'floors',
        'square_feet',
        'lot_size',
        'green_features',
        'certifications',
        'status',
        'is_featured',
        'is_new',
        'is_active',
        'meta_title',
        'meta_description',
        'tags',
        'views',
        'downloads',
        'favorites',
        'rating',
        'total_reviews',
        'published_at',
    ];

    protected $casts = [
        'green_features' => 'array',
        'certifications' => 'array',
        'tags' => 'array',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'bathrooms' => 'decimal:1',
        'square_feet' => 'decimal:2',
        'lot_size' => 'decimal:2',
        'rating' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_new' => 'boolean',
        'is_active' => 'boolean',
        'published_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function designer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(DesignImage::class);
    }

    public function files()
    {
        return $this->hasMany(DesignFile::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }

    // Accessors
    public function getPrimaryImageAttribute()
    {
        return $this->images()->where('is_primary', true)->first() 
            ?? $this->images()->first();
    }

    public function getGalleryImagesAttribute()
    {
        return $this->images()->where('type', 'gallery')->orderBy('sort_order')->get();
    }

    public function getFloorPlansAttribute()
    {
        return $this->images()->where('type', 'floor_plan')->orderBy('sort_order')->get();
    }

    public function getDiscountPercentageAttribute()
    {
        if ($this->original_price && $this->original_price > $this->price) {
            return round((($this->original_price - $this->price) / $this->original_price) * 100);
        }
        return 0;
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeNew($query)
    {
        return $query->where('is_new', true);
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeByPriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeBySpecs($query, $specs)
    {
        if (isset($specs['bedrooms'])) {
            $query->where('bedrooms', '>=', $specs['bedrooms']);
        }
        
        if (isset($specs['bathrooms'])) {
            $query->where('bathrooms', '>=', $specs['bathrooms']);
        }
        
        if (isset($specs['garages'])) {
            $query->where('garages', '>=', $specs['garages']);
        }
        
        if (isset($specs['floors'])) {
            $query->where('floors', '>=', $specs['floors']);
        }
        
        if (isset($specs['square_feet_min'])) {
            $query->where('square_feet', '>=', $specs['square_feet_min']);
        }
        
        if (isset($specs['square_feet_max'])) {
            $query->where('square_feet', '<=', $specs['square_feet_max']);
        }
        
        return $query;
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhere('plan_number', 'like', "%{$search}%")
              ->orWhereJsonContains('tags', $search);
        });
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($design) {
            if (empty($design->slug)) {
                $design->slug = Str::slug($design->title);
            }
            
            if (empty($design->plan_number)) {
                $design->plan_number = 'GH-' . date('Y') . '-' . str_pad(static::count() + 1, 3, '0', STR_PAD_LEFT);
            }
        });
    }

    // Methods
    public function incrementViews()
    {
        $this->increment('views');
    }

    public function incrementDownloads()
    {
        $this->increment('downloads');
    }

    public function updateRating()
    {
        $reviews = $this->reviews()->where('is_approved', true)->get();
        
        if ($reviews->count() > 0) {
            $this->rating = $reviews->avg('rating');
            $this->total_reviews = $reviews->count();
            $this->save();
        }
    }
}