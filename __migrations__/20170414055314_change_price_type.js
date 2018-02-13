exports.up = function(knex, Promise) {
  return knex.schema.alterTable('dishes', t => {
    t.float('price').alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('dishes', t => {
    t.integer('price').alter();
  });
};
