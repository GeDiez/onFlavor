exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('places', t => {
      t.increments('id').primary();
      t.string('name', 50);
      t.string('latitude', 11);
      t.string('longitude', 11);
      t.timestamps();
    })
    .createTable('groups', t => {
      t.increments('id').primary();
      t.string('name', 50);
      t.timestamps();
    })
    .createTable('events', t => {
      t.increments('id').primary();
      t.integer('place_id').references('places.id');
      t.integer('group_id').references('groups.id');
      t.dateTime('date_time');
      t.timestamps();
    })
    .createTable('users', t => {
      t.increments('id').primary();
      t.string('name', 50);
      t.string('username', 25);
      t.string('password', 25);
      t.timestamps();
    })
    .createTable('users_groups', t => {
      t.increments('id').primary();
      t.integer('group_id').references('groups.id');
      t.integer('user_id').references('users.id');
      t.timestamps();
    })
    .createTable('dishes', t => {
      t.increments('id').primary();
      t
        .integer('place_id')
        .references('places.id')
        .notNullable();
      t.string('name', 50);
      t.string('price', 5);
      t.timestamps();
    })
    .createTable('orders', t => {
      t.increments('id').primary();
      t.integer('event_id').references('events.id');
      t.integer('dish_id').references('dishes.id');
      t.integer('user_id').references('users.id');
      t.string('quantity');
      t.timestamps();
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists('orders')
    .dropTableIfExists('dishes')
    .dropTableIfExists('users_groups')
    .dropTableIfExists('users')
    .dropTableIfExists('events')
    .dropTableIfExists('groups')
    .dropTableIfExists('places');
};
