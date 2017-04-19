
exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('events', (t)=> {
      t.string('image_url');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('events', (t)=> {
      t.dropColumn('image_url')
    });
};
