<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriModel extends Model
{
    protected $fillable = [
        'title',
        'deskripsi',
    ];

    public function items()
    {
        return $this->hasMany(ItemsGaleriModel::class);
    }
}
