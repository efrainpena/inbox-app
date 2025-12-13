<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
    /**
     * creamos tabla de mesnajes.
     */
    public function up(): void
    {
    Schema::create('messages', function (Blueprint $table) {
        $table->id();
        $table->foreignId('thread_id')->constrained('threads')->cascadeOnDelete();
        $table->foreignId('sender_id')->constrained('users');
        $table->text('body');
        $table->timestamp('read_at')->nullable();
        $table->timestamps();
    });
    }

};
