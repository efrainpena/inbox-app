<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ThreadController extends Controller
{
    // GET /api/threads
    public function index(Request $request)
    {
        $user = Auth::guard('api')->user();

        $q = $request->query('q');

        $threads = Thread::with(['creator'])
            ->whereHas('participants', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            })
            ->search($q)
            ->latest()
            ->paginate(10);

        return response()->json($threads);
    }

    // GET /api/threads/{thread}
    public function show(Thread $thread)
    {
        $user = Auth::guard('api')->user();

        // Verificar que el usuario sea participante
        if (! $thread->participants()->where('users.id', $user->id)->exists()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $thread->load(['messages.sender', 'participants', 'creator']);

        return response()->json($thread);
    }

    // POST /api/threads
    // Crea un hilo y el primer mensaje
    public function store(Request $request)
    {
        $user = Auth::guard('api')->user();

        $data = $request->validate([
            'subject'      => ['required', 'string', 'max:255'],
            'body'         => ['required', 'string'],
            'participants' => ['array'],
            'participants.*' => ['integer', 'exists:users,id'],
        ]);

        // Crear el hilo
        $thread = Thread::create([
            'subject'    => $data['subject'],
            'created_by' => $user->id,
        ]);

        // Participantes = creador + los que vengan en el request
        $participants = $data['participants'] ?? [];
        $participants[] = $user->id;
        $participants = array_unique($participants);

        $thread->participants()->sync($participants);

        // Crear el primer mensaje
        $message = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $user->id,
            'body'      => $data['body'],
        ]);

        $thread->load(['messages.sender', 'participants']);

        return response()->json([
            'thread'  => $thread,
            'message' => $message,
        ], 201);
    }
}

