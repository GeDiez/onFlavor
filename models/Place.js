let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Place', {
  tableName: 'name',
  hasTimestamps: true,
});