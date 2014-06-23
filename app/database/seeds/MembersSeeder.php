<?php

use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MembersSeeder extends Seeder {

	public function run()
	{
        $faker = Factory::create();
        $members = array();

        // Create 1000 members
        for($i = 0; $i < 218; $i++)
        {
            $phone = '06' . $faker->randomElement(array(1, 2, 3, 4, 5, 6)) . '/' . $faker->randomElement(array($faker->numerify('###-####'), $faker->numerify('###-###')));

            array_push($members, array(
                'group_id' => $faker->randomElement(array(1, 2, 3, 4, 5, 6, 7, 8)),
                'uid' => $faker->unique()->numerify('#############'),
                'first_name' => $faker->firstName,
                'last_name' => $faker->firstName,
                'phone' => $faker->randomElement(array(NULL, $phone)),
                'notes' => NULL,
                'dob' => $faker->optional(0.7)->dateTimeBetween($startDate = '-10 years', $endDate = '-5 years'),
                'dos' => $faker->optional(0.7)->dateTimeBetween($startDate = '-2 years', $endDate = '-10 days'),
                'doc' => $faker->optional(0.7)->dateTimeBetween($startDate = '-6 months', $endDate = '-15 days'),
                'active' => $faker->randomElement(array(1, 1, 1, 1, 1, 0, 0)),
                'freeOfCharge' => $faker->randomElement(array(1, 1, 0, 0, 0, 0, 0)),
                'created_at' => $faker->dateTimeBetween($startDate = '-2 years', $endDate = '-10 days'),
                'updated_at' => $faker->dateTimeBetween($startDate = '-2 years', $endDate = '-10 days'),
            ));
        }

		// Delete all users
		DB::table('members')->truncate();

        DB::table('members')->insert($members);
	}

}
