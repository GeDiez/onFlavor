const bookshelf = require('../bookshelf');

const userTable = bookshelf.Model.extend(
  {
    tableName: 'users',
    myevents: function() {
      const Events = require('./eventsBS');
      const UsersEvents = require('./users_events');
      return this.belongsToMany(Events, 'user_id', 'event_id')
        .through(UsersEvents)
        .withPivot(['role']);
    },
  },
  {
    create: async function({ user, provider }) {
      try {
        if (
          !user.username ||
          !user.full_name ||
          !user.email ||
          (!provider && !user.password)
        )
          return {
            error:
              'faltan campos en la peticion, verifica que no halla campos incompletos',
          };
        const findUserByEmail = await this.where('email', user.email).fetch();
        if (findUserByEmail)
          return { error: 'el email ya se encuentra registrado' };
        const new_user = await this.forge(user, { hasTimestamps: true }).save();
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
        return find_user.toJSON();
      } catch (error) {
        return { error: 'ha ocurrido un error al obtener al usuario' + error };
      }
    },
    getEvents: async function({ userId }) {
      try {
        const user = await this.where('id', userId).fetch();
        if (!user) return { error: 'el usuario no existe' };
        const events = await this.forge({ id: userId }).fetch({
          columns: ['id', 'username', 'email'],
          withRelated: [
            {
              myevents: qb =>
                qb.columns([
                  'event_id',
                  'name',
                  'description',
                  'role',
                  'created_at',
                ]),
            },
          ],
        });
        events.toJSON({ omitPivot: true });
        return events;
      } catch (error) {
        return { error: 'no se pudo completar la accion status: ' + error };
      }
    },
  },
);

module.exports = userTable;
