<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KontakKami extends Model
{
    protected $table = 'kontak_kami';

    protected $fillable = [
        'judul',
        'deskripsi',
        'judul_kontak',
        'alamat',
        'telepon',
        'email',
        'jam_operasional',
        'judul_maps',
        'maps',
    ];
}
