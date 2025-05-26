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
        Schema::create('form_contact_us', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nama pengirim');
            $table->string('email')->comment('Email pengirim');
            $table->string('subject')->comment('Subjek pesan');
            $table->text('message')->comment('Isi pesan');
            $table->boolean('is_read')->default(false)->comment('Status apakah pesan sudah dibaca');
            $table->timestamp('read_at')->nullable()->comment('Waktu pesan dibaca');
            $table->boolean('is_replied')->default(false)->comment('Status apakah pesan sudah dibalas');
            $table->timestamp('replied_at')->nullable()->comment('Waktu pesan dibalas');
            $table->string('reply_message')->nullable()->comment('Isi balasan pesan');
            $table->string('reply_email')->nullable()->comment('Email balasan pesan');
            $table->string('reply_subject')->nullable()->comment('Subjek balasan pesan');
            $table->string('reply_name')->nullable()->comment('Nama pengirim balasan pesan');
            $table->boolean('is_active')->default(true)->comment('Status aktif dari pesan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_contact_us');
    }
};
