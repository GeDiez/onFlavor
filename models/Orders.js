const Bookshelf = require('../bookshelf');
const resFormat = require('../utils/responseFormat');

const Orders = Bookshelf.Model.extend(
  {
    tableName: 'orders',
    uuid: true,
    users: function() {
      const User = require('./Users');
      return this.belongsTo(User, 'user_id', 'id');
    },
    places: function() {
      const Place = require('./Places');
      return this.hasOne(Place);
    },
    dishes: function() {
      const Dishes = require('./Dishes');
      const OrderDish = require('./OrderDish');
      return this.belongsToMany(Dishes, 'order_dish', 'order_id', 'dish_id')
        .through(OrderDish)
        .withPivot(['dish_id', 'quantity', 'details']);
    },
    events: function() {
      const Event = require('./Events');
      return this.belongsTo(Event, 'event_id', 'id');
    },
  },
  {
    create: async function({ uuidEvent, uuidUser, dishes }) {
      try {
        //search for user in event
        const findOrder = await this.where({
          event_id: uuidEvent,
          user_id: uuidUser,
        }).fetch();
        if (findOrder)
          return resFormat(200, null, {
            msg:
              'Ya tienes una orden en este evento, puede revisar tus ordernes y editarla',
          });
        //
        const order = await this.forge(
          {
            event_id: uuidEvent,
            user_id: uuidUser,
          },
          { hasTimestamps: true },
        ).save();
        await order.dishes().attach(dishes);
        return resFormat(200, null, { order });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    update: async function({ uuidEvent, uuidUser, uuidOrder, dishes }) {
      try {
        const order = await this.forge(
          { id: uuidOrder },
          { hasTimestamps: true },
        ).fetch();
        if (!order)
          return resFormat(
            404,
            'el uuid del evento no correspone a ninguno existente',
          );
        if (!(order.get('event_id') === uuidEvent))
          return resFormat(400, 'la orden no corresponde a ese evento');
        await order.dishes().updatePivot(dishes);
        return resFormat(200, null, { order });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
  },
);

// const modelOrders = {
//   create: async ({ userId, eventId, order }) => {
//     return await dataSource.create({ userId, eventId, order });
//   },
//   delete: async ({ orderId, eventId }) => {
//     return await dataSource.delete({ orderId, eventId });
//   },
// };

module.exports = Orders;
