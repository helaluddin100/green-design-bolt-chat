<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::with(['author', 'category'])
                        ->published()
                        ->orderBy('published_at', 'desc');

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('excerpt', 'like', "%{$request->search}%")
                  ->orWhere('content', 'like', "%{$request->search}%")
                  ->orWhereJsonContains('tags', $request->search);
            });
        }

        // Category filter
        if ($request->has('category') && $request->category) {
            $query->where('category_id', $request->category);
        }

        // Tag filter
        if ($request->has('tag') && $request->tag) {
            $query->whereJsonContains('tags', $request->tag);
        }

        $posts = $query->paginate($request->get('per_page', 12));

        return response()->json([
            'success' => true,
            'data' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::with(['author', 'category'])
                       ->where('slug', $slug)
                       ->published()
                       ->firstOrFail();

        // Increment views
        $post->increment('views');

        // Get related posts
        $relatedPosts = BlogPost::where('category_id', $post->category_id)
                              ->where('id', '!=', $post->id)
                              ->published()
                              ->limit(3)
                              ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'post' => $post,
                'related_posts' => $relatedPosts,
            ],
        ]);
    }

    public function categories()
    {
        $categories = BlogCategory::active()
                                ->withCount(['posts' => function ($query) {
                                    $query->published();
                                }])
                                ->orderBy('name')
                                ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function featured()
    {
        $posts = BlogPost::with(['author', 'category'])
                        ->published()
                        ->featured()
                        ->orderBy('published_at', 'desc')
                        ->limit(3)
                        ->get();

        return response()->json([
            'success' => true,
            'data' => $posts,
        ]);
    }
}