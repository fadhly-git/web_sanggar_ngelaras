<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KontakKami extends Model
{
    protected $table = 'kontak_kamis';

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

    public function store(array $data)
    {
        return $this->updateOrCreate(
            ['id' => 1], // Assuming there's only one record
            $data
        );
    }

    public function getData()
    {
        return $this->firstOrCreate(
            ['id' => 1], // Assuming there's only one record
            [
                'judul' => '',
                'deskripsi' => '',
                'judul_kontak' => '',
                'alamat' => '',
                'telepon' => '',
                'email' => '',
                'jam_operasional' => '',
                'judul_maps' => '',
                'maps' => '',
            ]
        );
    }
}
