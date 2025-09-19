<?php

declare(strict_types=1);

return [
    'domain' => env('AUTH0_DOMAIN'),
    'audience' => [env('AUTH0_AUDIENCE')]
];
