<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin Builder
 * @mixin \Illuminate\Database\Query\Builder
 * @property int $id
 * @property string $name
 * @property string $notes
 * @property boolean $completed
 * @property string $due_date
 * @property User $user
 * @property int $user_id
 */
class Todo extends Authenticable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'notes',
        'completed',
        'due_date',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
