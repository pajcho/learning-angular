<?php namespace App\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;

class BaseController extends Controller {

    /**
     * Initializer.
     *
     * @return \App\Controllers\BaseController
     */
    public function __construct()
    {
        // CSRF Protection
        $this->beforeFilter('csrf', array('on' => 'post'));
    }

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if ( ! is_null($this->layout))
        {
            $this->layout = View::make($this->layout);
        }
    }
}
