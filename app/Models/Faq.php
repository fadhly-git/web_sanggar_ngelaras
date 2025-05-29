<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $table = 'faqs';

    protected $fillable = [
        'question',
        'answer',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function store(array $data)
    {
        return self::updateOrCreate(
            ['id' => $data['id'] ?? null], // Use 'id' from data if available
            $data
        );
    }


    public function getData()
    {
        return $this->active()->get();
    }
}
