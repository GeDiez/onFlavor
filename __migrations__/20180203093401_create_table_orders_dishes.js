exports.up = function(knex) {
  return knex.schema.createTable('orders_dishes', t => {
    t.increments('id').primary();
    t.integer('order_id').references('orders.id');
    t.integer('dish_id').references('dishes.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders_dishes');
};
