<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsItems extends Model
{
    protected $table = 'news_items';

    protected $fillable = [
        'title',
        'content',
        'summary',
        'author',
        'published_at',
        'image',
        'is_active',
        'tags',
        'slug',
    ];

        protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the formatted creation date.
     *
     * @return string
     */
    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null;
    }

    /**
     * Get the formatted update date.
     *
     * @return string
     */
    public function getUpdatedAtFormattedAttribute()
    {
        return $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null;
    }
    /**
     * Scope a query to only include active news.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
