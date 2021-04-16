<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $fillable = ['name','e_id'];

    public function area()
    {
        return $this->hasMany(\App\Area::class,'region_id');
    }

    public function tarifcity()
    {
        return $this->hasMany(\App\TarifCity::class,'region_id');
    }

    public function userDirection()
    {
        return $this->hasMany(\App\User::class,'region_id')->withCount('direction');
    }
}
