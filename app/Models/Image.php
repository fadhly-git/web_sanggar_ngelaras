<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'name',
        'path',
    ];
    protected $table = 'images';

    public function getImageUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }
    public function getImagePathAttribute()
    {
        return storage_path('app/public/' . $this->path);
    }
    public function getImageNameAttribute()
    {
        return pathinfo($this->path, PATHINFO_FILENAME);
    }
    public function getImageExtensionAttribute()
    {
        return pathinfo($this->path, PATHINFO_EXTENSION);
    }
}
