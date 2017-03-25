let bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Dish', {
  tableName: 'dishes',
  hasTimestamps: true,

});