<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // POST /api/threads/{thread}/messages
    public function store(Request $request, Thread $thread)
    {
        $user = Auth::guard('api')->user();

        // Verificar que el usuario sea participante del hilo
        if (! $thread->participants()->where('users.id', $user->id)->exists()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validate([
            'body' => ['required', 'string'],
        ]);

        $message = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $user->id,
            'body'      => $data['body'],
        ]);

        $message->load('sender');

        return response()->json($message, 201);
    }
}

