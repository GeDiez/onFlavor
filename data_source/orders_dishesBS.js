const bookshelf = require('../bookshelf');

const ordersDishesTable = bookshelf.Model.extend({
  tableName: 'orders_dishes',
  orders: function() {
    const Orders = require('./ordersBS');
    return this.belongsTo(Orders);
  },
  dishes: function() {
    const Dishes = require('./dishesBS');
    return this.belongsTo(Dishes);
  },
});

module.exports = ordersDishesTable;
