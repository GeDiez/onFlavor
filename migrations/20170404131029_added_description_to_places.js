exports.up = function(knex, Promise) {
  return knex.schema.alterTable('places', t => {
    t.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('places', t => {
    t.dropColumn('description');
  });
};
