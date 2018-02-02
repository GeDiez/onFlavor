let bookshelf = require('../bookshelf');
require('./Place');

module.exports = bookshelf.model('Dish', {
  tableName: 'dishes',
  hasTimestamps: true,
  place() {
    return this.belongsTo(Place);
  },
});
