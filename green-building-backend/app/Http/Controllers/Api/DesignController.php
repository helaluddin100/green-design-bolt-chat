<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Design;
use App\Models\Category;
use App\Models\DesignImage;
use App\Models\DesignFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class DesignController extends Controller
{
    public function index(Request $request)
    {
        $query = Design::with(['user', 'category', 'images'])
                      ->approved()
                      ->active()
                      ->published();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Category filter
        if ($request->has('category') && $request->category) {
            $query->byCategory($request->category);
        }

        // Price range filter
        if ($request->has('price_min') || $request->has('price_max')) {
            $priceMin = $request->price_min ?? 0;
            $priceMax = $request->price_max ?? 999999;
            $query->byPriceRange($priceMin, $priceMax);
        }

        // Specifications filter
        $specs = [];
        if ($request->has('bedrooms')) $specs['bedrooms'] = $request->bedrooms;
        if ($request->has('bathrooms')) $specs['bathrooms'] = $request->bathrooms;
        if ($request->has('garages')) $specs['garages'] = $request->garages;
        if ($request->has('floors')) $specs['floors'] = $request->floors;
        if ($request->has('square_feet_min')) $specs['square_feet_min'] = $request->square_feet_min;
        if ($request->has('square_feet_max')) $specs['square_feet_max'] = $request->square_feet_max;

        if (!empty($specs)) {
            $query->bySpecs($specs);
        }

        // Green features filter
        if ($request->has('green_features') && is_array($request->green_features)) {
            foreach ($request->green_features as $feature) {
                $query->whereJsonContains('green_features', $feature);
            }
        }

        // Featured filter
        if ($request->has('featured') && $request->featured) {
            $query->featured();
        }

        // New filter
        if ($request->has('new') && $request->new) {
            $query->new();
        }

        // Sorting
        switch ($request->get('sort', 'newest')) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'popular':
                $query->orderBy('views', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'size_small':
                $query->orderBy('square_feet', 'asc');
                break;
            case 'size_large':
                $query->orderBy('square_feet', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $designs = $query->paginate($request->get('per_page', 12));

        return response()->json([
            'success' => true,
            'data' => $designs,
        ]);
    }

    public function show($id)
    {
        $design = Design::with([
            'user',
            'category',
            'images' => function ($query) {
                $query->orderBy('sort_order');
            },
            'files',
            'reviews' => function ($query) {
                $query->approved()->with('user')->latest();
            }
        ])->findOrFail($id);

        // Increment views
        $design->incrementViews();

        return response()->json([
            'success' => true,
            'data' => $design,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'bedrooms' => 'required|integer|min:1',
            'bathrooms' => 'required|numeric|min:0.5',
            'garages' => 'nullable|integer|min:0',
            'floors' => 'required|integer|min:1',
            'square_feet' => 'required|numeric|min:1',
            'lot_size' => 'nullable|numeric|min:0',
            'green_features' => 'nullable|array',
            'certifications' => 'nullable|array',
            'tags' => 'nullable|array',
            'images' => 'required|array|min:3',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:pdf,dwg,zip|max:51200', // 50MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Create design
            $design = Design::create([
                'user_id' => auth()->id(),
                'category_id' => $request->category_id,
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'original_price' => $request->original_price,
                'bedrooms' => $request->bedrooms,
                'bathrooms' => $request->bathrooms,
                'garages' => $request->garages ?? 0,
                'floors' => $request->floors,
                'square_feet' => $request->square_feet,
                'lot_size' => $request->lot_size,
                'green_features' => $request->green_features ?? [],
                'certifications' => $request->certifications ?? [],
                'tags' => $request->tags ?? [],
                'status' => 'pending',
            ]);

            // Upload and save images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $filename = time() . '_' . $index . '.' . $image->getClientOriginalExtension();
                    $path = 'designs/' . $design->id . '/images/' . $filename;
                    
                    // Resize and optimize image
                    $img = Image::make($image);
                    $img->resize(1200, 800, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                    
                    Storage::disk('public')->put($path, $img->encode());
                    
                    DesignImage::create([
                        'design_id' => $design->id,
                        'filename' => $filename,
                        'original_name' => $image->getClientOriginalName(),
                        'path' => $path,
                        'url' => Storage::disk('public')->url($path),
                        'mime_type' => $image->getMimeType(),
                        'size' => $image->getSize(),
                        'width' => $img->width(),
                        'height' => $img->height(),
                        'type' => 'gallery',
                        'sort_order' => $index,
                        'is_primary' => $index === 0,
                    ]);
                }
            }

            // Upload and save files
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $path = 'designs/' . $design->id . '/files/' . $filename;
                    
                    Storage::disk('public')->putFileAs('designs/' . $design->id . '/files', $file, $filename);
                    
                    DesignFile::create([
                        'design_id' => $design->id,
                        'filename' => $filename,
                        'original_name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'url' => Storage::disk('public')->url($path),
                        'mime_type' => $file->getMimeType(),
                        'size' => $file->getSize(),
                        'type' => $this->getFileType($file->getClientOriginalExtension()),
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Design uploaded successfully and is pending approval',
                'data' => $design->load(['images', 'files']),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload design',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $design = Design::where('user_id', auth()->id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category_id' => 'sometimes|required|exists:categories,id',
            'price' => 'sometimes|required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'bedrooms' => 'sometimes|required|integer|min:1',
            'bathrooms' => 'sometimes|required|numeric|min:0.5',
            'garages' => 'nullable|integer|min:0',
            'floors' => 'sometimes|required|integer|min:1',
            'square_feet' => 'sometimes|required|numeric|min:1',
            'lot_size' => 'nullable|numeric|min:0',
            'green_features' => 'nullable|array',
            'certifications' => 'nullable|array',
            'tags' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $design->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Design updated successfully',
                'data' => $design->load(['images', 'files']),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update design',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $design = Design::where('user_id', auth()->id())->findOrFail($id);

        try {
            // Delete associated files from storage
            foreach ($design->images as $image) {
                Storage::disk('public')->delete($image->path);
            }

            foreach ($design->files as $file) {
                Storage::disk('public')->delete($file->path);
            }

            // Delete design (cascade will handle related records)
            $design->delete();

            return response()->json([
                'success' => true,
                'message' => 'Design deleted successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete design',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function featured()
    {
        $designs = Design::with(['user', 'category', 'images'])
                        ->approved()
                        ->active()
                        ->featured()
                        ->published()
                        ->orderBy('created_at', 'desc')
                        ->limit(8)
                        ->get();

        return response()->json([
            'success' => true,
            'data' => $designs,
        ]);
    }

    public function newest()
    {
        $designs = Design::with(['user', 'category', 'images'])
                        ->approved()
                        ->active()
                        ->published()
                        ->orderBy('created_at', 'desc')
                        ->limit(6)
                        ->get();

        return response()->json([
            'success' => true,
            'data' => $designs,
        ]);
    }

    public function categories()
    {
        $categories = Category::active()
                            ->ordered()
                            ->withCount(['designs' => function ($query) {
                                $query->approved()->active();
                            }])
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function myDesigns(Request $request)
    {
        $designs = Design::where('user_id', auth()->id())
                        ->with(['category', 'images', 'orderItems'])
                        ->orderBy('created_at', 'desc')
                        ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $designs,
        ]);
    }

    public function download(Request $request, $id)
    {
        $design = Design::findOrFail($id);
        
        // Check if user has purchased this design
        $hasPurchased = OrderItem::whereHas('order', function ($query) {
                                    $query->where('user_id', auth()->id())
                                          ->where('payment_status', 'paid');
                                })
                                ->where('design_id', $id)
                                ->exists();

        if (!$hasPurchased && $design->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'You must purchase this design to download files',
            ], 403);
        }

        $files = $design->files;
        
        if ($files->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No files available for download',
            ], 404);
        }

        // For single file, return direct download
        if ($files->count() === 1) {
            $file = $files->first();
            $file->incrementDownloads();
            $design->incrementDownloads();
            
            return response()->download(storage_path('app/public/' . $file->path));
        }

        // For multiple files, create ZIP
        $zip = new \ZipArchive();
        $zipFileName = 'design_' . $design->id . '_' . time() . '.zip';
        $zipPath = storage_path('app/temp/' . $zipFileName);
        
        if (!file_exists(storage_path('app/temp'))) {
            mkdir(storage_path('app/temp'), 0755, true);
        }

        if ($zip->open($zipPath, \ZipArchive::CREATE) === TRUE) {
            foreach ($files as $file) {
                $filePath = storage_path('app/public/' . $file->path);
                if (file_exists($filePath)) {
                    $zip->addFile($filePath, $file->original_name);
                }
            }
            $zip->close();

            // Increment download counts
            foreach ($files as $file) {
                $file->incrementDownloads();
            }
            $design->incrementDownloads();

            return response()->download($zipPath)->deleteFileAfterSend(true);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to create download package',
        ], 500);
    }

    public function secureDownload(Request $request, $type, $id)
    {
        // Secure file download with access control
        if ($type === 'design') {
            return $this->download($request, $id);
        } elseif ($type === 'sample') {
            // Allow sample downloads without purchase
            $design = Design::findOrFail($id);
            $sampleFile = $design->files()->where('type', 'sample')->first();
            
            if (!$sampleFile) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sample file not available',
                ], 404);
            }
            
            return response()->download(storage_path('app/public/' . $sampleFile->path));
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid download type',
        ], 400);
    }

    private function getFileType($extension)
    {
        $extension = strtolower($extension);
        
        switch ($extension) {
            case 'pdf':
                return 'pdf';
            case 'dwg':
            case 'dxf':
                return 'dwg';
            case 'zip':
            case 'rar':
                return 'zip';
            default:
                return 'other';
        }
    }
}