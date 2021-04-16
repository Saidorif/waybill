<?php

namespace App\Console\Commands;

use App\Area;
use App\Region;
use App\User;
use Illuminate\Console\Command;

class RegionEIIS extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'region:eiis';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get regions and areas from EIIS';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        try {
            //Send query
            $client = new \GuzzleHttp\Client();
            $response = $client->get('http://10.10.10.118/services/api/dazvol/get-region-district-list', [
                'auth' => [
                    'dazvoluser',
                    'd5ad29a96dc169eb2b01722d6493cd151510dc0b001801a1864bc31a24bdf07a'
                ]
            ]);
            $data_resp = json_decode($response->getBody()->getContents(),true);
            if(!empty($data_resp['result'])){
                $this->info('Retrieved ' . count($data_resp['result']).' regions');
                foreach($data_resp['result'] as $key => $region){
                    $the_region = Region::where(['e_id' => $region['id']])->first();
                    if(!$the_region){
                        $reg = Region::create([
                            'name' => $region['name'],
                            'e_id' => $region['id'],
                        ]);
                        if(count($region['districts']) > 0){
                            foreach ($region['districts'] as $district){
                                $the_area = Area::where(['e_id' => $district['id']])->first();
                                if(!$the_area) {
                                    $area = Area::create([
                                        'name' => $district['name'],
                                        'e_id' => $district['id'],
                                        'region_id' => $reg->id,
                                    ]);
                                }
                            }
                        }
                    }
                }
            }
            else{
                $this->info('Empty response');
            }
        } catch (\Throwable $th) {
             throw $th;
            $this->info('Что-то пошло не так. Пожалуйста, повторите попытку позже');
        }
    }
}
