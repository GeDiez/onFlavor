let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Group', {
  tableName: 'groups',
  hasTimestamps: true,

});