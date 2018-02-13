const bookshelf = require('../bookshelf');

const ordersTable = bookshelf.Model.extend(
  {
    tableName: 'orders',
    users: function() {
      const User = require('./usersBS');
      return this.belongsTo(User, 'user_id', 'id');
    },
    places: function() {
      const Place = require('./placesBS');
      return this.hasOne(Place);
    },
    dishes: function() {
      const Dishes = require('./dishesBS');
      const OrdersDishes = require('./orders_dishesBS');
      return this.belongsToMany(Dishes, 'dish_id', 'order_id')
        .through(OrdersDishes)
        .withPivot(['dish_id', 'quantity', 'details']);
    },
    events: function() {
      const Event = require('./eventsBS');
      return this.belongsTo(Event, 'event_id', 'id');
    },
  },
  {
    create: async function({ eventId, userId, order }) {
      if (!userId || !eventId || !order)
        return {
          error:
            'no se especifico uno de los siguientes campos: userid, eventid, order',
        };
      try {
        const events = require('./eventsBS');
        const event = await events.forge({ id: eventId }).fetch();
        if (!event) return { error: 'El evento no existe' };
        const orders = await event.orders().fetch();
        const order = orders.where({ user_id: userId });
        return { orders, order };

        const users = await event.users().fetch();
        const user = users.get(userId);
        if (user)
          return {
            error:
              'el usuario ya creo una orden para este evento, puedes actualizar o eliminar la orden existente',
          };
        await event.users().attach([{ role: 'invited', user_id: userId }]);
        const neworder = this.forge(
          {
            user_id: userId,
            event_id: eventId,
          },
          { hasTimestamps: true },
        );
        await neworder.save();
        await neworder.dishes().attach(order);
        return neworder;
      } catch (error) {
        return { error: 'no se pudo crear la orden ' + error };
      }
    },
    delete: async function({ orderId, eventId }) {
      try {
        const events = require('./eventsBS');
        const event = await events.forge({ id: eventId }).fetch();
        if (!event) return { error: 'el evento no existe' };
        const orders = await event.orders().fetch();
        const order = orders.get(orderId);
        // if (!order) return { error: 'la orden no pertenece al evento' };
        // const orders = await order.orders().fetch();
        // const order = orders.get(orderId);
        if (!order)
          return {
            error: 'la orden no pertenece a este evento',
          };
        await order.clone().destroy();
        return { order };
      } catch (error) {
        return { error: 'no se puedo eliminar la orden ' + error };
      }
    },
  },
);

module.exports = ordersTable;
