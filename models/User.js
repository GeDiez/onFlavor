let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
});