exports.up = function(knex, Promise) {
  return knex.schema.alterTable('events', t => {
    t.string('name');
    t.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('events', t => {
    t.dropColumn('name');
    t.dropColumn('description');
  });
};
