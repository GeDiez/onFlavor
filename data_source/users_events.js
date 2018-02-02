const bookshelf = require('../bookshelf');

const usersEventsTable = bookshelf.Model.extend({
  tableName: 'users_events',
  myevents: function() {
    const Events = require('./eventsBS');
    return this.belongsTo(Events);
  },
  users: function() {
    const Users = require('./usersBS');
    return this.belongsTo(Users);
  },
});

module.exports = usersEventsTable;
