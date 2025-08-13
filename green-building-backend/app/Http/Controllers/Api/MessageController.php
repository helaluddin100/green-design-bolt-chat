<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Models\Design;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function conversations(Request $request)
    {
        $conversations = Conversation::forUser(auth()->id())
                                   ->with(['buyer', 'designer', 'design', 'latestMessage'])
                                   ->orderBy('last_message_at', 'desc')
                                   ->paginate($request->get('per_page', 20));

        // Add unread count for each conversation
        $conversations->getCollection()->transform(function ($conversation) {
            $conversation->unread_count = $conversation->getUnreadCount(auth()->id());
            $conversation->other_participant = $conversation->getOtherParticipant(auth()->id());
            return $conversation;
        });

        return response()->json([
            'success' => true,
            'data' => $conversations,
        ]);
    }

    public function createConversation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'designer_id' => 'required|exists:users,id',
            'design_id' => 'nullable|exists:designs,id',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Verify designer exists and is actually a designer
        $designer = User::where('id', $request->designer_id)
                       ->where('user_type', 'designer')
                       ->first();

        if (!$designer) {
            return response()->json([
                'success' => false,
                'message' => 'Designer not found',
            ], 404);
        }

        try {
            // Check if conversation already exists
            $existingConversation = Conversation::where('buyer_id', auth()->id())
                                                ->where('designer_id', $request->designer_id)
                                                ->where('design_id', $request->design_id)
                                                ->first();

            if ($existingConversation) {
                // Add message to existing conversation
                $message = Message::create([
                    'conversation_id' => $existingConversation->id,
                    'sender_id' => auth()->id(),
                    'message' => $request->message,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Message sent to existing conversation',
                    'data' => $existingConversation->load(['messages.sender', 'buyer', 'designer']),
                ]);
            }

            // Create new conversation
            $conversation = Conversation::create([
                'buyer_id' => auth()->id(),
                'designer_id' => $request->designer_id,
                'design_id' => $request->design_id,
                'subject' => $request->subject,
                'last_message_at' => now(),
            ]);

            // Create first message
            $message = Message::create([
                'conversation_id' => $conversation->id,
                'sender_id' => auth()->id(),
                'message' => $request->message,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Conversation created successfully',
                'data' => $conversation->load(['messages.sender', 'buyer', 'designer', 'design']),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create conversation',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $conversation = Conversation::forUser(auth()->id())
                                  ->with([
                                      'messages' => function ($query) {
                                          $query->with('sender')->orderBy('created_at', 'asc');
                                      },
                                      'buyer',
                                      'designer',
                                      'design'
                                  ])
                                  ->findOrFail($id);

        // Mark messages as read
        $conversation->markAsRead(auth()->id());

        return response()->json([
            'success' => true,
            'data' => $conversation,
        ]);
    }

    public function sendMessage(Request $request, $id)
    {
        $conversation = Conversation::forUser(auth()->id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:2000',
            'attachments' => 'nullable|array|max:5',
            'attachments.*' => 'file|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $messageData = [
                'conversation_id' => $conversation->id,
                'sender_id' => auth()->id(),
                'message' => $request->message,
            ];

            // Handle file attachments
            if ($request->hasFile('attachments')) {
                $attachmentPaths = [];
                foreach ($request->file('attachments') as $file) {
                    $path = $file->store('messages', 'public');
                    $attachmentPaths[] = [
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize(),
                        'type' => $file->getMimeType(),
                    ];
                }
                $messageData['attachments'] = $attachmentPaths;
                $messageData['type'] = 'file';
            }

            $message = Message::create($messageData);

            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully',
                'data' => $message->load('sender'),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function markAsRead($id)
    {
        $conversation = Conversation::forUser(auth()->id())->findOrFail($id);
        $conversation->markAsRead(auth()->id());

        return response()->json([
            'success' => true,
            'message' => 'Messages marked as read',
        ]);
    }
}