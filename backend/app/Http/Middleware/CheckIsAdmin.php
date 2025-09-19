<?php

namespace App\Http\Middleware;

use App\Exceptions\ApiException;
use Closure;
use Illuminate\Http\Request;

class CheckIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     * @throws ApiException
     */
    public function handle(Request $request, Closure $next)
    {
        $user = get_user_by_auth_header();

        if (!$user || !$user->is_admin) {
            // You can throw an ApiException or return a response here
            throw new ApiException('Unauthorized: Admin access only', 403);
        }

        return $next($request);
    }
}
