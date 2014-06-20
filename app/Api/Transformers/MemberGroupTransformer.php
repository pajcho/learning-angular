<?php namespace Api\Transformers;

use App\Models\MemberGroup;
use League\Fractal\TransformerAbstract;

class MemberGroupTransformer extends TransformerAbstract
{
    public $availableIncludes = array('members');

    public $defaultIncludes = array();

    public function transform(MemberGroup $memberGroup)
    {
        return [
            'id'                    => (int) $memberGroup->id,
            'name'                  => $memberGroup->name,
            'location'              => $memberGroup->location,
            'description'           => $memberGroup->description,
            'training'              => $memberGroup->training,
            'created_at'            => (string) $memberGroup->created_at,
            'updated_at'            => (string) $memberGroup->updated_at,
            'links'   => [
                [
                    'rel' => 'self',
                    'uri' => '/groups/'.$memberGroup->id,
                ]
            ]
        ];
    }

    public function includeMembers(MemberGroup $memberGroup)
    {
        $members = $memberGroup->members;

        return $this->collection($members, new MemberTransformer);
    }
}