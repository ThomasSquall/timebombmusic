<?php

namespace App\Contracts;

use Illuminate\Http\Request;

interface JWTServiceInterface
{
    public function extractBearerTokenFromRequest(Request $request): string;
    public function decodeBearerToken(string $token): array;
}
