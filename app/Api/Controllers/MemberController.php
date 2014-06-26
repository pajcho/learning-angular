<?php namespace Api\Controllers;

use App\Models\Member;
use Dingo\Api\Exception\DeleteResourceFailedException;
use Dingo\Api\Exception\StoreResourceFailedException;
use Dingo\Api\Exception\UpdateResourceFailedException;
use Exception;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;

class MemberController extends ApiController {

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
        $paginate = Input::get('paginate', 'true') === 'true';

        return $paginate ? Member::paginate(15) : Member::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws \Dingo\Api\Exception\StoreResourceFailedException
     * @return Response
     */
    public function store()
    {
        try
        {
            return Member::create(Input::all());
        }
        catch(Exception $e)
        {
            // validation failed
            throw new StoreResourceFailedException('Could not create new member.', $e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $item = Member::find($id);

        if(!$item) App::abort(404);

        return $item;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @throws \Dingo\Api\Exception\UpdateResourceFailedException
     * @return Response
     */
    public function update($id)
    {
        try
        {
            $item = Member::findOrFail($id);
            $item->update(Input::all());

            return $item;
        }
        catch(Exception $e)
        {
            // validation failed
            throw new UpdateResourceFailedException('Could not update member.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @throws \Dingo\Api\Exception\DeleteResourceFailedException
     * @return Response
     */
    public function destroy($id)
    {
        try
        {
            $item = Member::findOrFail($id);
            $item->delete();

            return array(
                'deleted'   => true,
                'id'        => $id,
            );
        }
        catch(Exception $e)
        {
            // validation failed
            throw new DeleteResourceFailedException('Could not delete member.');
        }
    }

}
