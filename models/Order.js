const bookshelf = require('../bookshelf');
require('./Event');
require('./Dish');
require('./User');

module.exports = bookshelf.model('Order', {
  tableName: 'orders',
  hasTimestamps: true,
  event: function () {
    return this.belongsTo('Event');
  },
  dish: function() {
  	return this.belongsTo('Dish');
  },
  user: function() {
  	return this.belongsTo('User')
  }
});