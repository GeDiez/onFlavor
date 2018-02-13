const Bookshelf = require('../bookshelf');

const Dishes = Bookshelf.Model.extend({
  tableName: 'dishes',
  uuid: true,
  places: function() {
    const Place = require('./Places');
    return this.belongTo(Place);
  },
  orders: function() {
    const ordersDishes = require('./OrderDish');
    const orders = require('./Dishes');
    return this.belongsToMany(orders).through(ordersDishes);
  },
});

module.exports = Dishes;
