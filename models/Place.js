let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Place', {
  tableName: 'places',
  hasTimestamps: true,
});