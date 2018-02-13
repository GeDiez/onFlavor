const _knex = require('knex');
const deleteOnCascade = require('bookshelf-cascade-delete');

const knexfile =
  process.env.NODE_ENV !== 'development'
    ? require('./knexfile').development
    : require('./knexfile').production;
const knex = _knex(knexfile);
const bookshelf = require('bookshelf')(knex);

//Plugins
bookshelf.plugin('pagination');
bookshelf.plugin('registry');
bookshelf.plugin(require('bookshelf-uuid'));
bookshelf.plugin(deleteOnCascade);

module.exports = bookshelf;
