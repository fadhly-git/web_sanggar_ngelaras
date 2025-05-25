<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemsGaleriModel extends Model
{
    protected $fillable = [
        'galeri_model_id',
        'item_title',
        'img_path',
    ];

    public function galeri()
    {
        return $this->belongsTo(GaleriModel::class);
    }
    public function getOriginal($key = null, $default = null)
    {
        $original = parent::getOriginal($key, $default);
        if ($key === 'img_path') {
            return asset('storage/' . $original);
        }
        return $original;
    }
}
