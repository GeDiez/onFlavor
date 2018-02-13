const bookshelf = require('../bookshelf');

const eventsTable = bookshelf.Model.extend(
  {
    tableName: 'events',
    place: function() {
      const Place = require('./placesBS');
      return this.belongsTo(Place, 'place_id', 'id');
    },
    users: function() {
      const Users = require('./usersBS');
      return this.belongsToMany(Users, 'users_events', 'event_id', 'user_id');
    },
    orders: function() {
      const Orders = require('./ordersBS');
      return this.hasMany(Orders, 'event_id', 'id');
    },
  },
  {
    getEventById: async function(id) {
      try {
        const event = await this.where('id', id).fetch({
          withRelated: ['place', 'users'],
        });
        if (event === null) {
          return { error: 'No existe un usuario con ese id' };
        }
        return event.toJSON();
      } catch (error) {
        return { error: 'no se pudo completar la operacion ' + error };
      }
    },
    create: async function({ userId, event }) {
      try {
        const newEvent = this.forge(event, { hasTimestamps: true });
        const saveEvent = await newEvent.save();
        await saveEvent.users().attach([{ role: 'admin', user_id: userId }]);
        return {
          event: {
            ...saveEvent.toJSON({ omitPivot: true }),
            owner: { role: 'admin', user_id: userId },
          },
        };
      } catch (error) {
        return {
          error: 'no se pudo crear el evento status: ' + error,
        };
      }
    },
    getEvents: async function() {
      try {
        const events = await eventsTable.fetchAll({
          columns: ['id', 'name', 'description', 'image_url'],
          withRelated: [
            {
              place: qb =>
                qb.columns(
                  'name',
                  'description',
                  'image_url',
                  'latitude',
                  'longitude',
                ),
            },
            {
              users: qb => qb.columns('username', 'email', 'username', 'role'),
            },
          ],
        });
        return await events.toJSON({ omitPivot: true });
      } catch (error) {
        return { error: 'no se pudieron obtener los eventos status ' + error };
      }
    },
    update: async function({ eventId, event }) {
      try {
        const findevent = await this.forge({
          id: eventId,
        }).fetch();
        if (!findevent)
          return {
            error: 'no existe el evento con id: ' + eventId,
          };
        const saveEvent = await findevent.save(event);
        return { event: saveEvent.toJSON({ omitPivot: true }) };
      } catch (error) {
        return {
          error: 'no se pudo actualizar el evento status ' + error,
        };
      }
    },
    deleteById: async function(id) {
      try {
        const findevent = await this.where('id', id).fetch();
        if (!findevent) {
          return { error: 'no existe el evento con id' + id };
        }
        await findevent.clone().destroy();
        return { event: findevent };
      } catch (error) {
        return {
          error: 'no se pudo eliminar el evento error: ' + error,
        };
      }
    },
    getOrdersByEvent: async function({ userId, eventId }) {
      try {
        const event = await this.forge({ id: eventId }).fetch();
        const ordersByEvent = await event.orders().fetch({
          columns: ['id', 'created_at', 'user_id'],
          withRelated: [
            {
              users: q =>
                q.columns('users.id', 'full_name', 'username', 'email'),
            },
            {
              dishes: q =>
                q.columns(
                  'dishes.id',
                  'place_id',
                  'name',
                  'price',
                  'quantity',
                  'details',
                ),
            },
          ],
        });
        return { ordersByEvent: ordersByEvent.toJSON({ omitPivot: true }) };
      } catch (error) {
        return { error: 'no se pudieron encontrar las ordenes ' + error };
      }
    },
    getUsersByEvent: async function({ eventId }) {
      try {
        const event = await this.forge({ id: eventId }).fetch();
        const users = await event.users().fetch();
        return users;
      } catch (error) {
        console.log('error usersByEvents ' + error);
      }
    },
  },
);

module.exports = eventsTable;
