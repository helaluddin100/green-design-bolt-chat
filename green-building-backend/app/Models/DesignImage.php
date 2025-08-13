<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'design_id',
        'filename',
        'original_name',
        'path',
        'url',
        'mime_type',
        'size',
        'width',
        'height',
        'type',
        'sort_order',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    // Relationships
    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    // Accessors
    public function getFullUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }

    public function getSizeFormattedAttribute()
    {
        $bytes = $this->size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }

    // Scopes
    public function scopePrimary($query)
    {
        return $query->where('is_primary', true);
    }

    public function scopeGallery($query)
    {
        return $query->where('type', 'gallery');
    }

    public function scopeFloorPlans($query)
    {
        return $query->where('type', 'floor_plan');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}