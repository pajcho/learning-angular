<?php

$controller = 'App\Controllers\ApplicationController';

Route::get('/', array('as' => 'application.index', 'uses' => $controller . '@index'));
