<?php

use Illuminate\Database\Seeder;
use App\Conts;
use App\Action;

class ControllerActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $controllers = [
            'DashboardController' => [
                'index',
            ],
            'FileController' => [
                'store',
                'destroy',
            ],
            'UserController' => [
                'find',
                'profile',
                'changePasword',
                'carrier',
                'carrierEdit',
                'carrierUpdate',
                'checkuser',
                'register',
            ],
            'EmployeeController' => [
                'index',
                'checkemail',
                'store',
                'list',
                'edit',
                'update',
                'destroy',
            ],
            'RegionController' => [
                'index',
                'store',
                'edit',
                'update',
                'destroy',
            ],
            'AreaController' => [
                'index',
                'list',
                'store',
                'edit',
                'update',
                'destroy',
            ],
            'PositionController' => [
                'index',
                'list',
                'store',
                'edit',
                'update',
                'destroy',
            ],
            'RoleController' => [
                'index',
                'store',
                'list',
                'edit',
                'update',
                'destroy',
            ],
            'ContsController' => [
                'index',
                'find',
                'trashed',
                'restore',
                'store',
                'update',
                'edit',
                'allContActions',
            ],
            'ActionController' => [
                'edit',
                'store',
                'trashed',
                'restore',
                'update',
                'index',
            ],
            'PermissionController' => [
                'index',
                'store',
            ]
        ];
        foreach($controllers as $key => $controller){
            $cont = Conts::create([
                'name' => $key,
                'label' => $key,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            if($cont){
                foreach($controller as $key => $item){
                    $ation = DB::table('actions')->insert([
                        'conts_id' => $cont->id,
                        'code' => $item,
                        'name' => $item,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
