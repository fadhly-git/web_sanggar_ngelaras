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
        Schema::create('news_items', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Judul berita');
            $table->text('content')->comment('Isi berita');
            $table->string('summary')->comment('Ringkasan berita');
            $table->string('author')->comment('Penulis berita');
            $table->date('published_at')->comment('Tanggal publikasi berita');
            $table->string('image')->nullable()->comment('Gambar berita');
            $table->boolean('is_active')->default(true)->comment('Status aktif dari berita');
            $table->string('tags')->comment('Tag atau kategori berita, dipisahkan dengan koma')->nullable();
            $table->string('slug')->unique()->comment('Slug untuk URL berita');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_items');
    }
};
