const Bookshelf = require('../Bookshelf');

const compose = require('../utils/compose');
const resFormat = require('../utils/responseFormat');
const validateEvent = require('../helpers/validationEvents');
const validationGenerals = require('../helpers');

const Events = Bookshelf.Model.extend(
  {
    tableName: 'events',
    uuid: true,
    place: function() {
      const Places = require('./Places');
      return this.belongsTo(Places, 'place_id', 'id');
    },
    users: function() {
      const Users = require('./Users');
      const EventUser = require('./EventUser');
      return this.belongsToMany(Users)
        .through(EventUser)
        .withPivot(['role', 'created_at', 'update_at']);
    },
    userOwner: function() {
      const Users = require('./Users');
      const EventUser = require('./EventUser');
      return this.belongsToMany(Users)
        .through(EventUser)
        .withPivot(['role'])
        .query({ where: { role: 'owner' } });
    },
    usersAdmin: function() {
      const Users = require('./Users');
      const EventUser = require('./EventUser');
      return this.belongsToMany(Users)
        .through(EventUser)
        .withPivot(['role'])
        .query({ where: { role: 'admin' } });
    },
    orders: function() {
      const Orders = require('./Orders');
      return this.hasMany(Orders, 'event_id', 'id');
    },
  },
  {
    getById: async function(uuid) {
      try {
        const validate = validationGenerals.testUUID({ uuid, msgs: [] });
        if (validate.msgs.length > 0) return resFormat(400, validate.msgs);
        const event = await this.forge({ id: uuid }).fetch({
          withRelated: [
            {
              place: q =>
                q.columns([
                  'id',
                  'name',
                  'address',
                  'phone_number',
                  'image_url',
                ]),
            },
            { users: q => q.columns(['user_id', 'username']) },
          ],
        });
        if (!event) return resFormat(404, 'evento no encontrado');
        return resFormat(200, null, {
          event: event.toJSON({ omitPivot: true }),
        });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    getAll: async function() {
      try {
        const now = new Date();
        const events = await this.where('date_time', '>', now).fetchAll({
          columns: [
            'id',
            'place_id',
            'created_at',
            'updated_at',
            'date_time',
            'description',
            'image_url',
          ],
          withRelated: [
            {
              users: q =>
                q.columns(['user_id', 'fullname', 'username', 'role']),
            },
            {
              place: q => q.columns(['id', 'name', 'address', 'phone_number']),
            },
          ],
        });
        return resFormat(200, { events: events.toJSON({ omitPivot: true }) });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    addAdmin: async function({ uuidEvent, uuidUser }) {
      try {
        const findEvent = await this.forge({ id: uuidEvent }).fetch();
        if (!findEvent) return resFormat(404, 'evento no existente');
        const usersAdmin = await findEvent.usersAdmin().fetch();
        if (usersAdmin.get(uuidUser))
          return resFormat(201, null, {
            msg: 'El usario ya es administrador',
          });
        await findEvent.users().attach({ user_id: uuidUser, role: 'admin' });
        return resFormat(201, null, {
          msg: 'Se ha agregado como Admin al usuario',
        });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    create: async function({ uuidUser, event }) {
      try {
        //validate fields
        const validate = compose(
          validateEvent.dateTimeRange,
          validateEvent.fieldsRequireds,
        )({ event, msgs: [] });
        if (validate.msgs.length > 0) return resFormat(200, validate.msgs);
        const newEvent = await this.forge(event, {
          hasTimestamps: true,
        }).save();
        await newEvent
          .users()
          .attach(
            { user_id: uuidUser, role: 'owner' },
            { hasTimestamps: true },
          );
        return resFormat(201, null, { event: newEvent });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    update: async function({ uuidEvent, event }) {
      try {
        const findEvent = await this.forge({ id: uuidEvent }).fetch();
        if (!findEvent) return resFormat(404, 'evento no existente');
        await findEvent.save(event, { patch: true, method: 'update' });
        return resFormat(201, null, { event: findEvent });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    deleteById: async function(eventId) {
      try {
        const findEvent = await this.forge({ id: eventId }).fetch();
        if (!findEvent) return resFormat(404, 'evento no existente');
        await findEvent.destroy();
        return resFormat(201, null, { msg: 'message deleted' });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
  },
);

module.exports = Events;
