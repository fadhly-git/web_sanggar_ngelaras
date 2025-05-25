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
        Schema::create('items_galeri_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('galeri_model_id')->constrained('galeri_models')->onDelete('cascade');
            $table->string('item_title');
            $table->string('img_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items_galeri_models');
    }
};
