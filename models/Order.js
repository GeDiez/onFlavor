let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Order', {
  tableName: 'orders',
  hasTimestamps: true,

});