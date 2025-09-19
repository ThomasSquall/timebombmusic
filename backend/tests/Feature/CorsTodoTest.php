<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

class CorsTodoTest extends TestCase
{
    private const FRONTEND_ORIGIN = 'https://app.timebombmusic.it';

    /**
     * @dataProvider todoEndpoints
     */
    public function test_preflight_requests_include_cors_headers(string $uri, string $method): void
    {
        $response = $this->withHeaders([
            'Origin' => self::FRONTEND_ORIGIN,
            'Access-Control-Request-Method' => $method,
            'Access-Control-Request-Headers' => 'authorization, content-type',
        ])->options($uri);

        $response->assertNoContent();
        $response->assertHeader('Access-Control-Allow-Origin', self::FRONTEND_ORIGIN);
        $response->assertHeader('Access-Control-Allow-Methods');
        $response->assertHeader('Access-Control-Allow-Headers');

        $allowedMethods = $response->headers->get('Access-Control-Allow-Methods');
        self::assertIsString($allowedMethods);
        self::assertStringContainsString($method, $allowedMethods);

        $allowedHeaders = $response->headers->get('Access-Control-Allow-Headers');
        self::assertIsString($allowedHeaders);
        self::assertStringContainsStringIgnoringCase('authorization', $allowedHeaders);
    }

    /**
     * @return array<int, array{0: string, 1: string}>
     */
    public static function todoEndpoints(): array
    {
        return [
            ['/api/todo', 'POST'],
            ['/api/todo/', 'POST'],
            ['/api/todo/1', 'PUT'],
            ['/api/todo/1', 'DELETE'],
            ['/api/todo/complete/1', 'PATCH'],
        ];
    }
}
