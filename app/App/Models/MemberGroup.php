<?php namespace App\Models;

class MemberGroup extends BaseModel {

    public $timestamps = true;
    
    protected $table = 'member_groups';
    protected $softDelete = false;
    
    protected $fillable = array('name', 'location', 'description', 'training', 'details');

    public function members()
    {
        return $this->hasMany('App\Models\Member', 'group_id');
    }

    /**
     * Make sure we always have training days as object
     * even if user has not yet initiated it
     *
     * @return mixed|\stdClass
     */
    public function getTrainingAttribute()
    {
        $training = json_decode($this->attributes['training']);

        if(!is_object($training))
        {
            $training = new \stdClass();
            $training->monday = NULL;
            $training->tuesday = NULL;
            $training->wednesday = NULL;
            $training->thursday = NULL;
            $training->friday = NULL;
            $training->saturday = NULL;
            $training->sunday = NULL;
        }
        else
        {
            foreach($training as $key => $value)
            {
                if(!($value->start && $value->end)) $training->{$key} = NULL;
            }
        }

        return $training;
    }
}