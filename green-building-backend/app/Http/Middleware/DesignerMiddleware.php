<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DesignerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || !auth()->user()->isDesigner()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Designer account required.',
            ], 403);
        }

        return $next($request);
    }
}