<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banners extends Model
{
    //
    protected $fillable = [
        'heading',
        'sub_heading',
        'link',
    ];
    protected $table = 'banners';
    public $timestamps = true;
    protected $primaryKey = 'id';
}
