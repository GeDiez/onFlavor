exports.up = function(knex) {
  return knex.schema.alterTable('orders', t => {
    t.dropColumn('dish_id');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('orders', t => {
    t.integer('dish_id').references('dishes.id');
  });
};
