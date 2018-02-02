exports.up = function(knex) {
  return knex.schema.alterTable('places', t => {
    t.integer('likes');
    t.text('address');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('places', t => {
    t.dropColumn('likes');
    t.dropColumn('address');
  });
};
