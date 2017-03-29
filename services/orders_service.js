const bookshelf = require('../bookshelf');
const Order = require('../models/Order');
const knex = bookshelf.knex;

module.exports = {
  fetch: () => {
    return new Promise((resolve, reject)=>{
      Order.fetchAll({ withRelated: ['user', 'dish'] }).then((dishes)=>{
        resolve(dishes.toJSON());
      });
    });
  },

  fetchByEventId: (eventId) => {
    return new Promise((resolve, reject)=>{
      Order.where('event_id', eventId).fetchAll({ withRelated: ['user', 'dish'] }).then((dishes)=>{
        resolve(dishes.toJSON());
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

  deleteById: (orderId) => {
    return new Promise((resolve, reject) => {
      Order.where('id', orderId).fetch().then(order => {
        if(order){
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