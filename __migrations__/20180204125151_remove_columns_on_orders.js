exports.up = function(knex) {
  return knex.schema.alterTable('orders', t => {
    t.dropColumn('quantity');
    t.dropColumn('details');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('orders', t => {
    t.integer('quantity');
    t.string('details');
  });
};
