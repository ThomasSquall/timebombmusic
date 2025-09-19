<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @mixin Builder
 * @mixin \Illuminate\Database\Query\Builder
 * @property string $email
 * @property string $auth0_id
 * @property boolean $is_admin
 * @property string $avatar
 * @property string $name
 * @property Todo[] $todos
 * @property Thread[] $threads
 */
class User extends Authenticable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'auth0_id'
    ];

    public function todos(): HasMany {
        return $this->hasMany(Todo::class);
    }

    public function threads(): BelongsToMany {
        return $this->belongsToMany(Thread::class, 'thread_user', 'user_id', 'thread_id')
            ->with('participants')
            ->with('messages');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
