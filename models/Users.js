const Bookshelf = require('../bookshelf');
const resFormat = require('../utils/responseFormat');

const Users = Bookshelf.Model.extend(
  {
    tableName: 'users',
    uuid: true,
    myEvents: function() {
      const Events = require('./Events');
      const UsersEvents = require('./EventUser');
      return this.belongsToMany(Events)
        .through(UsersEvents)
        .withPivot(['role']);
    },
    myOrders: function() {
      const Orders = require('./Orders');
      return this.hasMany(Orders, 'user_id');
    },
  },
  {
    create: async function(user) {
      try {
        if (!user)
          return resFormat(409, 'el formato debe ser { user: {...fields} }');
        if (!user.access_key || !user.username || !user.email || !user.fullname)
          return resFormat(
            409,
            'los siguientes campos son obligatorios: fullname, username, email, access_key',
          );
        const fieldsUser = {
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          image_url: user.image_url,
          access_key: user.access_key,
          provider: user.provider,
        };
        const newUser = await this.forge(fieldsUser, {
          hasTimestamps: true,
        }).save();
        return resFormat(201, null, {
          user: newUser,
        });
      } catch (error) {
        return resFormat(500, error.detail);
      }
    },
    getByEmail: async function(email) {
      const user = await this.where({ email }).fetch();
      if (!user) return resFormat(404, { error: 'user not found' });
      return resFormat(200, null, { user });
    },
    getEvents: async function(uuidUser) {
      try {
        const user = await this.forge({ id: uuidUser }).fetch();
        if (!user) return resFormat(404, 'el usuario no existe');
        const events = await user.myEvents().fetch({
          columns: [
            'event_id',
            'place_id',
            'date_time',
            'role',
            'events.description',
            'events.image_url',
          ],
          withRelated: [{ place: q => q.columns(['id', 'name']) }],
        });
        return resFormat(200, null, {
          events: events.toJSON({ omitPivot: true }),
        });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
  },
);

// const modelUsers = {
//   model: dataSource,
//   verifyUser: async password_digest => {
//     const user = await dataSource.verifyUser(password_digest);
//     return user;
//   },
//   getById: async userId => {
//     return await dataSource.getById(userId);
//   },
//   getEvents: async userId => {
//     return await dataSource.getEvents(userId);
//   },
//   deleteEvent: async ({ userId, eventId }) => {
//     return await dataSource.deleteEvent({ userId, eventId });
//   },
//   getProfileByEmail: async ({ email }) => {
//     return await dataSource.getProfileByEmail({ email });
//   },
//   create: async ({ user, provider, order }) => {
//     return await dataSource.create({ user, provider, order });
//   },
// };

module.exports = Users;
