<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    protected $table = 'about_us';

    protected $fillable = [
        'tentang_kami',
        'summary',
        'sejarah',
        'visi',
    ];

    public function misi()
    {
        return $this->hasMany(Misi::class, 'about_id');
    }

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
