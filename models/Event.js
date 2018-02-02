let bookshelf = require('../bookshelf');
require('./Place');
require('./Group');
require('./Order');

module.exports = bookshelf.model('Event', {
  tableName: 'events',
  hasTimestamps: true,
  place: () => this.belongsTo('Place'),
  group: () => this.belongsTo('Group'),
  orders: () => this.hasMany('Order'),
});
