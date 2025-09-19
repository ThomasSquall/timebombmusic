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
        if ($this->isCorsPreflight($request) && $this->originHeaderIsAllowed($request)) {
            $response = response()->noContent();

            $this->ensureCorsHeaders($request, $response);
            $this->appendPreflightHeaders($request, $response);
            $this->finalizeResponseHeaders($response);

            return $response;
        }

        $response = $next($request);

        $this->ensureCorsHeaders($request, $response);
        $this->finalizeResponseHeaders($response);

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

    private function isCorsPreflight(Request $request): bool
    {
        if (!$request->isMethod('OPTIONS')) {
            return false;
        }

        if (!$request->headers->has('Origin')) {
            return false;
        }

        return $request->headers->has('Access-Control-Request-Method');
    }

    private function originHeaderIsAllowed(Request $request): bool
    {
        $origin = $request->headers->get('Origin');

        if (!is_string($origin) || $origin === '') {
            return false;
        }

        return $this->originIsAllowed($origin);
    }

    private function appendPreflightHeaders(Request $request, Response $response): void
    {
        $allowedMethods = $this->resolveAllowedMethods($request);

        if ($allowedMethods !== '') {
            $response->headers->set('Access-Control-Allow-Methods', $allowedMethods);
        }

        $allowedHeaders = $this->resolveAllowedHeaders($request);

        if ($allowedHeaders !== '') {
            $response->headers->set('Access-Control-Allow-Headers', $allowedHeaders);
        }

        $maxAge = config('cors.max_age');

        if ($maxAge !== null) {
            $response->headers->set('Access-Control-Max-Age', (string) $maxAge);
        }
    }

    private function resolveAllowedMethods(Request $request): string
    {
        $configured = config('cors.allowed_methods', []);

        if (in_array('*', $configured, true)) {
            $methods = ['OPTIONS'];

            $requestedMethod = $request->headers->get('Access-Control-Request-Method');

            if (is_string($requestedMethod) && $requestedMethod !== '') {
                $methods[] = strtoupper($requestedMethod);
            }

            return implode(', ', array_unique(array_filter($methods)));
        }

        $normalized = [];

        foreach ($configured as $method) {
            if (!is_string($method) || $method === '') {
                continue;
            }

            $normalized[] = strtoupper($method);
        }

        if (!in_array('OPTIONS', $normalized, true)) {
            $normalized[] = 'OPTIONS';
        }

        if (empty($normalized)) {
            return 'OPTIONS';
        }

        return implode(', ', array_unique($normalized));
    }

    private function resolveAllowedHeaders(Request $request): string
    {
        $configured = config('cors.allowed_headers', []);

        if (in_array('*', $configured, true)) {
            $requestedHeaders = $request->headers->get('Access-Control-Request-Headers');

            if (is_string($requestedHeaders) && trim($requestedHeaders) !== '') {
                return $requestedHeaders;
            }

            return '*';
        }

        $headers = [];

        foreach ($configured as $header) {
            if (!is_string($header) || $header === '') {
                continue;
            }

            $headers[] = $header;
        }

        return implode(', ', array_unique($headers));
    }

    private function finalizeResponseHeaders(Response $response): void
    {
        $response->headers->add(config('headers.include'));

        foreach (config('headers.exclude') as $header) {
            $response->headers->remove($header);
            header_remove($header);
        }
    }
}
