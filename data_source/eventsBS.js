const bookshelf = require('../bookshelf');
const Place = require('./placesBS');

const eventsTable = bookshelf.Model.extend(
  {
    tableName: 'events',
    place: function() {
      return this.hasOne(Place, 'id');
    },
    users: function() {
      const Users = require('./usersBS');
      return this.belongsToMany(Users, 'users_events', 'event_id', 'user_id');
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
    createEvent: async function(event) {
      try {
        const newEvent = await this.forge(event);
        const saveEvent = await newEvent.save();
        return saveEvent.toJSON();
      } catch (error) {
        return {
          error:
            'no se pudo crear el evento status: no contiene los campos especificados',
        };
      }
    },
    getEvents: async function(options) {
      try {
        const events = await eventsTable.fetchAll({
          columns: ['id', 'name', 'description'],
          withRelated: [
            {
              place: qb =>
                qb.columns(
                  'id',
                  'name',
                  'description',
                  'image_url',
                  'latitude',
                  'longitude',
                ),
            },
            {
              users: qb =>
                qb.columns('id', 'username', 'email', 'username', 'role'),
            },
          ],
        });
        return await events.toJSON();
      } catch (error) {
        return { error: 'no se pudieron obtener los eventos status ' + error };
      }
    },
    updateEvent: async function({ id, event }) {
      try {
        const findevent = await this.where('id', id).fetch();
        if (!findevent) {
          return {
            error: 'no existe el evento con id :' + id,
          };
        }
        const saveEvent = await this.forge(event).save();
        return saveEvent.toJSON();
      } catch (error) {
        return {
          error:
            'no se pudo crear el evento status: no contiene los campos especificados',
        };
      }
    },
    deleteEvent: async function(id) {
      try {
        const findevent = await this.where('id', id).fetch();
        if (!findevent) {
          return { error: 'no existe el evento con id' + id };
        }
        const deleteevent = await findevent.destroy();
        return deleteevent;
      } catch (error) {
        return {
          error: 'no se pudo eliminar el evento error: ' + error,
        };
      }
    },
  },
);

module.exports = eventsTable;
