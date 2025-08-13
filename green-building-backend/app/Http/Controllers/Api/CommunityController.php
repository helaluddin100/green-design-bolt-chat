<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CommunityPost;
use App\Models\CommunityComment;
use App\Models\CommunityCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommunityController extends Controller
{
    public function posts(Request $request)
    {
        $query = CommunityPost::with(['user', 'category'])
                             ->active()
                             ->orderBy('is_pinned', 'desc')
                             ->orderBy('created_at', 'desc');

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('content', 'like', "%{$request->search}%");
            });
        }

        // Category filter
        if ($request->has('category') && $request->category) {
            $query->where('category_id', $request->category);
        }

        $posts = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $posts,
        ]);
    }

    public function show($id)
    {
        $post = CommunityPost::with([
            'user',
            'category',
            'comments' => function ($query) {
                $query->with('user')->orderBy('created_at', 'asc');
            }
        ])->findOrFail($id);

        // Increment views
        $post->increment('views');

        return response()->json([
            'success' => true,
            'data' => $post,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:community_categories,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
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
            $post = CommunityPost::create([
                'user_id' => auth()->id(),
                'category_id' => $request->category_id,
                'title' => $request->title,
                'content' => $request->content,
                'tags' => $request->tags ?? [],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Post created successfully',
                'data' => $post->load(['user', 'category']),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create post',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function addComment(Request $request, $postId)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:community_comments,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $post = CommunityPost::findOrFail($postId);

        try {
            $comment = CommunityComment::create([
                'post_id' => $post->id,
                'user_id' => auth()->id(),
                'parent_id' => $request->parent_id,
                'content' => $request->content,
            ]);

            // Increment comment count
            $post->increment('comments_count');

            return response()->json([
                'success' => true,
                'message' => 'Comment added successfully',
                'data' => $comment->load('user'),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to add comment',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function categories()
    {
        $categories = CommunityCategory::active()
                                     ->withCount(['posts' => function ($query) {
                                         $query->active();
                                     }])
                                     ->orderBy('sort_order')
                                     ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}