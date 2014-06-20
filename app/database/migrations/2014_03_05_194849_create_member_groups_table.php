<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberGroupsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('member_groups', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->string('location');
            $table->text('description')->nullable()->default(NULL);
            $table->text('training')->nullable()->default(NULL);

			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('member_groups');
	}

}
