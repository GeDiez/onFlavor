const Bookshelf = require('../bookshelf');

const OrderDish = Bookshelf.Model.extend({
  tableName: 'order_dish',
  uuid: true,
  orders: function() {
    const Orders = require('./Orders');
    return this.belongsTo(Orders);
  },
  dishes: function() {
    const Dishes = require('./Dishes');
    return this.belongsTo(Dishes);
  },
});

module.exports = OrderDish;
