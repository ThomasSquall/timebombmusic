<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->text("body");
            $table->string("content_type");
            $table->unsignedBigInteger('author_id');
            $table->unsignedBigInteger('thread_id');
            $table->foreign("author_id")->references("id")->on("users");
            $table->foreign('thread_id')->references("id")->on("threads");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message');
    }
};
