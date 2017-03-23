var knexFile = require('./knexfile.js');
var knex = require('knex')(knexFile.development);
var cascadeDelete = require('bookshelf-cascade-delete');

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin(cascadeDelete.default);
bookshelf.plugin('registry');

module.exports = bookshelf;