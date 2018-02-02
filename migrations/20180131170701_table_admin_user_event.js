exports.up = function(knex) {
  return knex.schema.createTable('admin_users_events', t => {
    t.increments('id').primary();
    t.integer('user_id').references('users.id');
    t.integer('event_id').references('events.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin_users_events');
};
