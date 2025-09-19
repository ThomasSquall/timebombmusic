<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Exceptions\ApiException;
use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var Auth
     */
    protected Auth $auth;

    /**
     * Create a new middleware instance.
     *
     * @param Auth $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string|null $guard
     * @return mixed
     * @throws ApiException
     */
    public function handle(Request $request, Closure $next, string $guard = null): mixed
    {
        if ($this->auth->guard($guard)->guest()) {
            Log::info('Token:', ['token' => $request->header('Authorization')]);
            throw new ApiException('Requires authentication', 401);
        }

        return $next($request);
    }
}
