
exports.up = function(knex, Promise) {
  return knex.schema
  .alterTable('users', (t)=> {
    t.dropColumn('password');
    t.dropColumn('name');
    t.string('full_name');
    t.string('email');
    t.string('password_digest');
    t.string('reset_password_token');
    t.timestamp('reset_password_token_sent_at');
    t.string('role');
    t.string('confirmation_token');
    t.timestamp('confirmed_at');
    t.timestamp('confirmation_sent_at');
    t.string('code', 10);
    t.unique('username');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
  .alterTable('users', (t)=> {
    t.dropColumn('full_name');
    t.dropColumn('email');
    t.dropColumn('password_digest');
    t.dropColumn('reset_password_token');
    t.dropColumn('reset_password_token_sent_at');
    t.dropColumn('role');
    t.dropColumn('confirmation_token');
    t.dropColumn('confirmed_at');
    t.dropColumn('confirmation_sent_at');
    t.dropColumn('code');
    t.dropUnique('username');
    t.string('password', 25);
    t.string('name', 25);
  });
};
