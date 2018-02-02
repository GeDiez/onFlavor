const _knex = require('knex');
const knexfile =
  process.env.NODE_ENV !== 'development'
    ? require('./knexfile').development
    : require('./knexfile').production;
const knex = _knex(knexfile);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('pagination');
bookshelf.plugin('registry');
bookshelf.plugin(require('bookshelf-uuid'));
module.exports = bookshelf;
