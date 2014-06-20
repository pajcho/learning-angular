<?php

    $controller = 'Api\Controllers\MemberController';
    $groupController = 'Api\Controllers\MemberGroupController';

    // API routes
    Route::api(array('version' => 'v1', 'prefix' => 'api', 'protected' => false), function() use ($controller, $groupController)
    {
        /**
         * We are using this instead of resource routes just
         * to be able to have route names preserved
         * if there is future change in names
         */
        Route::group(array('prefix' => 'members'), function() use ($controller, $groupController)
        {
            Route::group(array('prefix' => 'groups'), function() use ($groupController)
            {
                Route::get('/', array('as' => 'groups.index', 'uses' => $groupController . '@index'));
                Route::get('create', array('as' => 'groups.create', 'uses' => $groupController . '@create'));
                Route::post('/', array('as' => 'groups.store', 'uses' => $groupController . '@store'));
                Route::get('{group}', array('as' => 'groups.show', 'uses' => $groupController . '@show'));
                Route::get('{group}/edit', array('as' => 'groups.edit', 'uses' => $groupController . '@edit'));
                Route::put('{group}', array('as' => 'groups.update', 'uses' => $groupController . '@update'));
                Route::delete('{group}', array('as' => 'groups.destroy', 'uses' => $groupController . '@destroy'));
            });

            Route::get('/', array('as' => 'members.index', 'uses' => $controller . '@index'));
            Route::get('create', array('as' => 'members.create', 'uses' => $controller . '@create'));
            Route::post('/', array('as' => 'members.store', 'uses' => $controller . '@store'));
            Route::get('{member}', array('as' => 'members.show', 'uses' => $controller . '@show'));
            Route::get('{member}/edit', array('as' => 'members.edit', 'uses' => $controller . '@edit'));
            Route::put('{member}', array('as' => 'members.update', 'uses' => $controller . '@update'));
            Route::delete('{member}', array('as' => 'members.destroy', 'uses' => $controller . '@destroy'));

        });

    });