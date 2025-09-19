<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin Builder
 * @mixin \Illuminate\Database\Query\Builder
 * @property int $id
 * @property int $author_id
 * @property int $thread_id
 * @property string $content_type
 * @property string $body
 * @property Attachment[] $attachments
 * @property Thread $thread
 */
class Message extends Model
{
    use HasFactory;

    public function attachments(): HasMany {
        return $this->hasMany(Attachment::class);
    }

    public function thread(): BelongsTo {
        return $this->belongsTo(Thread::class);
    }
}
