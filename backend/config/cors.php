<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => (static function () {
        $rawOrigins = env('CLIENT_ORIGIN_URLS');

        if (empty($rawOrigins)) {
            $rawOrigins = env('CLIENT_ORIGIN_URL', '');
        }

        if (!is_string($rawOrigins)) {
            $rawOrigins = '';
        }

        $candidates = preg_split('/[\s,]+/', $rawOrigins, -1, PREG_SPLIT_NO_EMPTY) ?: [];

        $origins = [];

        foreach ($candidates as $candidate) {
            $candidate = trim($candidate);

            if ($candidate === '') {
                continue;
            }

            if ($candidate !== '*') {
                $candidate = rtrim($candidate, '/');
            }

            $origins[] = $candidate;
        }

        $defaultOrigins = [
            'http://localhost:3000',
            'https://app.timebombmusic.it',
            'https://timebombmusic.it',
        ];

        if (empty($origins)) {
            $origins = $defaultOrigins;
        } else {
            $origins = array_merge($origins, $defaultOrigins);
        }

        $origins = array_values(array_unique($origins));

        if (in_array('*', $origins, true)) {
            return ['*'];
        }

        return $origins;
    })(),

    'allowed_origins_patterns' => (static function () {
        $patterns = [
            '~^https?://([a-z0-9-]+\.)?timebombmusic\\.it$~i',
            '~^https?://localhost(:\d+)?$~i',
            '~^https?://127\\.0\\.0\\.1(:\d+)?$~',
        ];

        $rawPatterns = env('CLIENT_ORIGIN_PATTERNS');

        if (is_string($rawPatterns) && trim($rawPatterns) !== '') {
            foreach (preg_split('/[\s,]+/', $rawPatterns, -1, PREG_SPLIT_NO_EMPTY) as $pattern) {
                $pattern = trim($pattern);

                if ($pattern === '') {
                    continue;
                }

                $patterns[] = $pattern;
            }
        }

        return array_values(array_unique($patterns));
    })(),

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 86400,

    'supports_credentials' => false,

];
