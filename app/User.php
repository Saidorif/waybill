<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Role;
use Carbon\Carbon;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'middlename',
        'surname',
        'email',
        'password',
        'role_id',
        'position_id',
        'region_id',
        'area_id',
        'image',
        'status',
        'city',
        'phone',
        'bank_number',
        'oked',
        'inn',
        'mfo',
        'address',
        'balance',
        'company_name',
        'license_number',
        'license_date',
        'license_type',
        'trusted_person',
        'updated_by',
        'created_by',
        'data',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
        'data',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'data' => 'array',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function role()
    {
        return $this->belongsTo(\App\Role::class, 'role_id');
    }

    public function region()
    {
        return $this->belongsTo(\App\Region::class, 'region_id');
    }

    public function area()
    {
        return $this->belongsTo(\App\Area::class, 'area_id');
    }

    public function position(){
        return $this->belongsTo(\App\Position::class,'position_id');
    }

    public function getFio()
    {
        return $this->name .' '. $this->middlename .' '. $this->surname;
    }

    public function cars()
    {
        return $this->hasMany(\App\UserCar::class,'user_id');
    }

    public function applications()
    {
        return $this->hasMany(\App\Application::class,'user_id');
    }

    public function contracts()
    {
        return $this->hasMany(\App\Contract::class,'user_id');
    }

    public function direction()
    {
        return $this->hasMany(\App\Direction::class,'created_by');
    }
}
