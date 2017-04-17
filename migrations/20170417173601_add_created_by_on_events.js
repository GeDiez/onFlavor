
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('events', (t)=> {
      t.integer('created_by').references('users.id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('events', (t)=> {
      t.dropColumn('created_by');
    });
};
