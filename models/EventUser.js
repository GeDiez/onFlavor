const Bookshelf = require('../bookshelf');

const EventUser = Bookshelf.Model.extend({
  tableName: 'event_user',
  uuid: true,
  myevents: function() {
    const Events = require('./Events');
    return this.belongsTo(Events);
  },
  users: function() {
    const Users = require('./Users');
    return this.belongsTo(Users);
  },
});

module.exports = EventUser;
