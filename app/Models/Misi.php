<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Misi extends Model
{
    protected $table = 'misis';

    protected $fillable = [
        'about_id',
        'icon',
        'deskripsi',
        'urutan',
    ];

    public function about()
    {
        return $this->belongsTo(AboutUs::class);
    }

    public function misis()
    {
        return $this->hasMany(Misi::class, 'about_id');
    }
}
