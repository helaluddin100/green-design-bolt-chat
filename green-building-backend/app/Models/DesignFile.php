<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignFile extends Model
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
        'type',
        'description',
        'download_count',
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

    // Methods
    public function incrementDownloads()
    {
        $this->increment('download_count');
    }
}