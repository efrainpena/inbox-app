<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
/*
Route::get('/debug-token', function (Request $request) {
    return response()->json([
        'authorization_header' => $request->header('Authorization'),
    ]);
}); se cometa porque si funciono la prueba
*/
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Inbox
    Route::get('/threads', [ThreadController::class, 'index']);
    Route::get('/threads/{thread}', [ThreadController::class, 'show']);
    Route::post('/threads', [ThreadController::class, 'store']);
    Route::post('/threads/{thread}/messages', [MessageController::class, 'store']);
});

