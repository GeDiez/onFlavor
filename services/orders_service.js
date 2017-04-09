const bookshelf = require('../bookshelf');
const Order = require('../models/Order');
const Dish = require('../models/Dish');
const User = require('../models/User');
const Event = require('../models/Event');
const knex = bookshelf.knex;

module.exports = {
  fetchOrders: () => {
    return new Promise((resolve, reject)=>{
      Order.fetchAll({ withRelated: ['user', 'dish', 'event'] }).then((orders)=>{
        resolve(orders.toJSON());
      });
    });
  },

  fetchByEventId: (eventId) => {
    return new Promise((resolve, reject)=>{
      Order
      .where('event_id', eventId)
      .fetchAll({ withRelated: [
        {'dish': function(qb) {qb.column('id', 'name', 'price')}}, 
        'event.place.dishes', 
        {'user': function(qb) {qb.column('id', 'full_name')}}
        ] 
      })
      .then((orders)=>{
        resolve(orders.toJSON());
      });
    });
  },

  createOrUpdateWithObj: (order) => {
    return new Promise((resolve, reject) => {
      if (!order.id) {
        new Order().save(order).then((order) => {
          resolve(order);
        });
      } else {
        Order.where('id', order.id).fetch().then((localOrder) => {
          if(localOrder){
            localOrder.save(order).then((newOrder) => {
              resolve(newOrder);
            });
          }
          else {
            reject({error: 'Order not found'});
          }
        }).catch((error) => {reject(error)});
      }
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Order.where('id', id).fetch().then(order => {
        resolve(order);
      });
    })
  },

  deleteById: (orderId, userId) => {
    return new Promise((resolve, reject) => {
      Order.where('id', orderId).fetch().then(order => {
        const jsonOrder = order.toJSON();
        if(order && (jsonOrder.user_id == userId)){
          order.destroy();
          resolve({message: 'Order deleted'});
        }
        else {
          reject({error: 'Order not found'});
        }
      })
    })
  }

}
