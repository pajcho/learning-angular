<?php namespace App\Models;

class Member extends BaseModel {

    public $timestamps = true;
    
    protected $table = 'members';
    protected $softDelete = false;
    
    protected $fillable = array('group_id', 'uid', 'first_name', 'last_name', 'phone', 'notes', 'dob', 'dos', 'doc', 'active', 'freeOfCharge');
    protected $dates = array('dob', 'dos', 'doc');
    protected $appends = array('full_name');

    public function group()
    {
        return $this->belongsTo('App\Models\MemberGroup');
    }

    /**
     * Get member full name
     * 
     * @return string
     */
    public function getFullNameAttribute()
    {
        return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
    }
}