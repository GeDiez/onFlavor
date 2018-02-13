exports.up = function(knex) {
  return knex.schema.alterTable('users_events', t => {
    t.string('role', 10);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users_events', t => {
    t.dropColumn('role');
  });
};
