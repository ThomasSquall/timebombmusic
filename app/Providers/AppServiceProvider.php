<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\JWTServiceInterface;
use App\Exceptions\ApiException;
use App\Services\JWTService;
use Http\Adapter\Guzzle7\Client as GuzzleAdapter;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     * @throws ApiException
     */
    public function register(): void
    {
        if (!isset($_ENV['VALIDATE_ENV']) || $_ENV['VALIDATE_ENV']) {
            $required = ['CLIENT_ORIGIN_URL', 'AUTH0_DOMAIN', 'AUTH0_AUDIENCE'];
            foreach ($required as $name) {
                $value = env($name);
                if (empty($value)) {
                    throw new ApiException('The required environment variables are missing. Please check the .env file.');
                }
            }
        }

        $this->app->bind(JWTServiceInterface::class, JWTService::class);
        $this->app->singleton('httpClient', function () {
            return GuzzleAdapter::createWithConfig([]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
    }
}
