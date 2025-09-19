<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\JWT;

class TokenController extends Controller
{
    protected JWT $jwt;

    public function __construct(JWT $jwtAuth)
    {
        $this->jwt = $jwtAuth;
    }

    public function checkTokenValidity(Request $request): JsonResponse
    {
        try {
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json(['isValid' => false, 'error' => 'No token provided']);
            }

            $payload = $this->jwt->setToken($token)->getPayload();

            // Check if the token has expired
            if ($payload['exp'] < now()->timestamp) {
                return response()->json(['isValid' => false, 'error' => 'Token has expired']);
            }

            $user = Auth::user();
            return response()->json(['isValid' => true, 'user' => $user]);

        } catch (TokenExpiredException $e) {
            return response()->json(['isValid' => false, 'error' => 'Token has expired']);
        } catch (\Exception $e) {
            return response()->json(['isValid' => false, 'error' => 'An error occurred']);
        }
    }

    public function refresh(Request $request): JsonResponse
    {
        try {
            $oldToken = $request->bearerToken();
            if(!$oldToken) {
                return response()->json(['error' => 'No token provided'], 401);
            }
            $token = $this->jwt->setToken($oldToken)->refresh();
            return response()->json(['token' => $token]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token refresh failed'], 401);
        }
    }
}
