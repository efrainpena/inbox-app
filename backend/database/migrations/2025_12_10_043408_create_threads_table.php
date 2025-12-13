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
        Schema::dropIfExists('threads');
    }
    /**
     * Crear la tabla.
     */
    public function up(): void
    {
    Schema::create('threads', function (Blueprint $table) {
        $table->id();
        $table->string('subject');
        $table->foreignId('created_by')->constrained('users');
        $table->timestamps();
        });
    }

};
