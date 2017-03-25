let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Users_group', {
  tableName: 'users_groups',
  hasTimestamps: true,

});