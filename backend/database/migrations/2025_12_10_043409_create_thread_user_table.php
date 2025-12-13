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
        Schema::dropIfExists('thread_user');
    }

    /**
     * creamos tabla union de hilos con usuarios.
     */
    public function up(): void
    {
    Schema::create('thread_user', function (Blueprint $table) {
        $table->id();
        $table->foreignId('thread_id')->constrained('threads')->cascadeOnDelete();
        $table->foreignId('user_id')->constrained('users');
        $table->timestamps();
        $table->unique(['thread_id', 'user_id']);
    });
    }

};
