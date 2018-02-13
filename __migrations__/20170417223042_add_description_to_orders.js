exports.up = function(knex, Promise) {
  return knex.schema.alterTable('orders', t => {
    t.string('details');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('orders', t => {
    t.dropColumn('details');
  });
};
