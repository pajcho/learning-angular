<?php

$controller = 'App\Controllers\ApplicationController';

Route::get('{slug?}', array('as' => 'application.index', 'uses' => $controller . '@index'))->where('slug', '(.*)?');
