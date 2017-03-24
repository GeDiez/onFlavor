exports.up = (knex, Promise) => {
  return knex.schema.createTable('places', (t)=> {
    t.increments('id').primary();
    t.string('name', 25);
    t.string('latitude', 11);
    t.string('longitude', 11);

    t.timestamps();
  })
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists('places');
};
