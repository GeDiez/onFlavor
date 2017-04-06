let bookshelf = require('../bookshelf');
require('./Place');
require('./Group');
module.exports = bookshelf.model('Event', {
  tableName: 'events',
  hasTimestamps: true,

  place: function() {
  	return this.belongsTo('Place');
  },
  group: function() {
  	return this.belongsTo('Group')
  }
});