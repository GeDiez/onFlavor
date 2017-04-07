let bookshelf = require('../bookshelf');
require('./Place');
require('./Group');
require('./Order');

module.exports = bookshelf.model('Event', {
  tableName: 'events',
  hasTimestamps: true,

  place: function() {
  	return this.belongsTo('Place');
  },
  group: function() {
  	return this.belongsTo('Group')
  },
  order: function() {
  	return this.hasMany('Order')
  }
});