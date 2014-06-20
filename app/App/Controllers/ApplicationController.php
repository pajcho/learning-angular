<?php namespace App\Controllers;

use Illuminate\Support\Facades\View;

class ApplicationController extends BaseController {

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return View::make('layouts.default');
    }
}
