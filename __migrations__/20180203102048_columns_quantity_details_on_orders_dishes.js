exports.up = function(knex) {
  return knex.schema.alterTable('orders_dishes', t => {
    t.float('quantity');
    t.string('details', 60);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('orders_dishes', t => {
    t.dropColumn('quantity');
    t.dropColumn('details');
  });
};
