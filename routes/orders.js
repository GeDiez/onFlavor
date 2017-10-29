const express = require('express');
const orders = express.Router();
const OrdersService = require('../services/orders_service');
const helpers = require('../lib/helpers');

orders.use(helpers.requireAuthentication);

orders.get('/', (req, res, next) => {
  OrdersService.fetch().then((orders)=> {
    res.json(orders);
  }).catch();
});

orders.post('/', (req, res, next) =>{
  const order = {
    event_id: Number(req.body.event_id),
    dish_id: Number(req.body.dish_id),
    user_id: Number(req.user.id),
    quantity: Number(req.body.quantity),
    details: req.body.details || null
  };
  OrdersService.createOrUpdateWithObj(order).then(savedOrder => {
    OrdersService.getById(savedOrder.id).then((order) => {
      res.io.emit('orders:new', order.toJSON());
    });
    res.json(savedOrder);
  });
});

orders.delete('/:id', (req, res, next) => {
  OrdersService.deleteById(req.params.id).then(message => {
    if (!message.error) {
      res.io.emit('orders:delete', { id: Number(req.params.id) });
    }
    res.json(message);
  }).catch();
});

orders.get('/:id/events', (req, res, next) => {
  OrdersService.fetchByEventId(req.params.id).then((orders)=> {
    res.json(orders);
  }).catch();
});

module.exports = orders;
