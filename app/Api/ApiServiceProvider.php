<?php namespace Api;

use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class ApiServiceProvider extends ServiceProvider {

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        // Bring in the routes
        require __DIR__ . '/routes.php';
        require __DIR__ . '/transformers.php';
    }

    public function register()
    {
        // Bind custom app classes
    }
}
