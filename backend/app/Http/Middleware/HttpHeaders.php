<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HttpHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $response = $next($request);

        $this->ensureCorsHeaders($request, $response);

        $response->headers->add(config('headers.include'));

        foreach (config('headers.exclude') as $header) {
            $response->headers->remove($header);
            header_remove($header);
        }

        return $response;
    }

    private function ensureCorsHeaders(Request $request, Response $response): void
    {
        if ($response->headers->has('Access-Control-Allow-Origin')) {
            return;
        }

        $origin = $request->headers->get('Origin');

        if ($origin === null || $origin === '') {
            return;
        }

        if (!$this->originIsAllowed($origin)) {
            return;
        }

        $response->headers->set('Access-Control-Allow-Origin', $origin);
        $this->appendVaryHeader($response, 'Origin');

        if (config('cors.supports_credentials', false) && !$response->headers->has('Access-Control-Allow-Credentials')) {
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }
    }

    private function originIsAllowed(string $origin): bool
    {
        $allowedOrigins = config('cors.allowed_origins', []);
        $allowedPatterns = config('cors.allowed_origins_patterns', []);

        if (in_array('*', $allowedOrigins, true)) {
            return true;
        }

        if (in_array($origin, $allowedOrigins, true)) {
            return true;
        }

        foreach ($allowedPatterns as $pattern) {
            if ($pattern === '') {
                continue;
            }

            $match = @preg_match($pattern, $origin);

            if ($match === 1) {
                return true;
            }
        }

        return false;
    }

    private function appendVaryHeader(Response $response, string $value): void
    {
        $existing = $response->headers->get('Vary');

        $values = array_filter(array_map('trim', explode(',', (string) $existing)));
        $values[] = $value;

        $response->headers->set('Vary', implode(', ', array_unique($values)));
    }
}
