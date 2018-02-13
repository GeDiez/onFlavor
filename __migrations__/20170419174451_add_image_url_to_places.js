exports.up = function(knex) {
  return knex.schema.alterTable('places', t => {
    t.string('image_url');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('places', t => {
    t.dropColumn('image_url');
  });
};
