
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('places', (t)=> {
      t.string('image_url');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('places', (t)=> {
      t.dropColumn('image_url')
    });
};
