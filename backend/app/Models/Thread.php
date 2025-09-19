<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin Builder
 * @mixin \Illuminate\Database\Query\Builder
 * @property int $id
 * @property string $type
 * @property Message[] $messages
 * @property User[] $participants
 */
class Thread extends Model
{
    use HasFactory;

    public function messages(): HasMany {
        return $this->hasMany(Message::class);
    }

    public function participants(): BelongsToMany {
        return $this->belongsToMany(User::class, 'thread_user', 'thread_id', 'user_id');
    }
}
