const bookshelf = require('../bookshelf');

const userTable = bookshelf.Model.extend(
  {
    tableName: 'users',
    myevents: function() {
      const Events = require('./eventsBS');
      const UsersEvents = require('./users_events');
      return this.belongsToMany(Events)
        .through(UsersEvents)
        .withPivot(['role']);
    },
    orders: function() {
      const Orders = require('./ordersBS');
      return this.hasMany(Orders, 'user_id', 'id');
    },
  },
  {
    getById: async function(userId) {
      try {
        const user = await this.forge({ id: userId }).fetch();
        if (!user) return { error: 'el usuario no existe' };
        return { user: user.toJSON({ omitPivot: true }) };
      } catch (error) {
        return { error: 'no se pudo crear al usuario' + error };
      }
    },
    create: async function({ user, provider }) {
      try {
        if (!user.full_name || !user.email || (!provider && !user.password))
          return {
            error:
              'faltan campos en la peticion, verifica que no halla campos incompletos',
          };
        const findUsername = await this.where(
          'username',
          user.username,
        ).fetch();
        const findUserByEmail = await this.where('email', user.email).fetch();
        if (findUserByEmail)
          return { error: 'el email ya se encuentra registrado' };
        const new_user = this.forge(user, { hasTimestamps: true });
        if (findUsername)
          new_user.set('username', user.username + new Date().getTime());
        await new_user.save();
        if (!new_user) return { error: 'no se pudo crear el usuario' };
        return new_user.toJSON();
      } catch (error) {
        return { error: 'no se pudo crear al usuario' + error };
      }
    },
    getProfileByEmail: async function({ email }) {
      try {
        const find_user = await this.where('email', email).fetch();
        if (!find_user) {
          return null;
        }
        return find_user;
      } catch (error) {
        return { error: 'ha ocurrido un error al obtener al usuario' + error };
      }
    },
    getEvents: async function({ userId }) {
      try {
        const user = await this.where('id', userId).fetch();
        if (!user) return { error: 'el usuario no existe' };
        const myevents = await user.myevents().fetch({
          withRelated: ['place'],
        });
        return myevents;
      } catch (error) {
        return { error: 'no se pudo completar la accion status: ' + error };
      }
    },
    deleteEvent: async function({ userId, eventId }) {
      const user = await this.forge({ id: userId }).fetch();
      const myEvents = await user.myevents().fetch();
      const findEvent = myEvents.get(eventId);
      if (!findEvent || findEvent.get('role' !== 'admin'))
        return { error: 'no puedes eliminar este evento' };
      const events = require('./eventsBS');
      const eventDestroyed = await events.deleteById(eventId);
      return eventDestroyed;
    },
  },
);

module.exports = userTable;
