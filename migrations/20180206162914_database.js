exports.up = knex =>
  knex.schema
    .createTable('places', t => {
      t.uuid('id').primary();
      t.string('name', 50);
      t.string('phone_number', 15);
      t.string('address');
      t.string('latitude', 20);
      t.string('longitude', 20);
      t.text('image_url');
      t.timestamps();
    })
    .createTable('users', t => {
      t.uuid('id').primary();
      t.string('fullname', 50);
      t.string('email', 50);
      t.string('username', 50);
      t.string('image_url');
      t.string('provider');
      t.string('access_key', 50);
      t.unique(['username', 'email']);
      t.timestamps();
    })
    .createTable('events', t => {
      t.uuid('id').primary();
      t.text('description');
      t.text('image_url');
      t.timestamps();
      t.dateTime('date_time');
      t
        .uuid('place_id')
        .references('places.id')
        .onDelete('CASCADE');
    })
    .createTable('dishes', t => {
      t.uuid('id').primary();
      t.string('name', 20);
      t.float('price', 2);
      t.timestamps();
      t
        .uuid('place_id')
        .references('places.id')
        .onDelete('CASCADE');
    })
    .createTable('orders', t => {
      t.uuid('id').primary();
      t.uuid('event_id').references('events.id');
      t.uuid('user_id').references('users.id');
      t.timestamps();
    })
    .createTable('order_dish', t => {
      t.uuid('id').primary();
      t.integer('quantity');
      t.string('details');
      t
        .uuid('order_id')
        .references('orders.id')
        .onDelete('CASCADE');
      t
        .uuid('dish_id')
        .references('dishes.id')
        .onDelete('CASCADE');
    })
    .createTable('event_user', t => {
      t.uuid('id').primary();
      t.string('role', 5);
      t.timestamps();
      t
        .uuid('event_id')
        .references('events.id')
        .onDelete('CASCADE');
      t
        .uuid('user_id')
        .references('users.id')
        .onDelete('CASCADE');
    });

exports.down = function(knex) {
  return knex.schema
    .dropTable('places')
    .dropTable('users')
    .dropTable('events')
    .dropTable('dishes')
    .dropTable('orders')
    .dropTable('order_dish')
    .dropTable('event_user');
};
