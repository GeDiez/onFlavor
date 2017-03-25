let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Event', {
  tableName: 'events',
  hasTimestamps: true,

});