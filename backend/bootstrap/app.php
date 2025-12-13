<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\Authenticate as JwtAuthenticate;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\RefreshToken as JwtRefresh;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',   // 👈 agregamos este
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: '/api',                   // 👈 hace que quede /api/...
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Alias para JWT
        $middleware->alias([
            'jwt.auth'    => JwtAuthenticate::class,
            'jwt.refresh' => JwtRefresh::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();