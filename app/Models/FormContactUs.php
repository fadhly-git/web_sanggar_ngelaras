<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormContactUs extends Model
{
    protected $table = 'form_contact_us';

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'is_read',
        'read_at',
        'is_replied',
        'replied_at',
        'reply_message',
        'reply_email',
        'reply_subject',
        'reply_name',
        'is_active',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime',
        'is_replied' => 'boolean',
        'replied_at' => 'datetime',
        'is_active' => 'boolean',
    ];
    /**
     * Get the full name of the sender.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return $this->attributes['name'] ?? 'Unknown Sender';
    }
    /**
     * Get the formatted date when the message was read.
     *
     * @return string|null
     */
    public function getReadAtFormattedAttribute()
    {
        return $this->read_at ? $this->read_at->format('Y-m-d H:i:s') : null;
    }
    /**
     * Get the formatted date when the message was replied.
     *
     * @return string|null
     */
    public function getRepliedAtFormattedAttribute()
    {
        return $this->replied_at ? $this->replied_at->format('Y-m-d H:i:s') : null;
    }
    /**
     * Get the status of the message as a string.
     *
     * @return string
     */
    public function getStatusAttribute()
    {
        if ($this->is_active) {
            return $this->is_read ? 'Read' : 'Unread';
        }
        return 'Inactive';
    }
}
