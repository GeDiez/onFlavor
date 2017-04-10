const express = require('express');
const api = express.Router();
const web = express.Router();
const OrdersService = require('../services/orders_service');
const helpers = require('../lib/helpers');

api.get('/', helpers.requireAuthentication, (req, res, next) => {
  OrdersService.fetch().then((orders)=> {
    res.json(orders);
  }).catch();
});



api.post('/', helpers.requireAuthentication, (req, res, next) =>{
  const order = {
    event_id: Number(req.body.event_id),
    dish_id: Number(req.body.dish_id),
    user_id: Number(req.user.id),
    quantity: Number(req.body.quantity),
  };
  OrdersService.createOrUpdateWithObj(order).then((message) => {
    res.json(message);
  });
});

web.get('/', function(req, res, next) {
  res.render('index');
});

web.get('/new', function(req, res, next) {
    res.render('../views/orders/new');
});



web.post('/edit/:id', (req, res, next) => {
  const order = {
    id: Number(req.params.id),
    event_id: Number(req.body.eventid),
    dish_id: Number(req.body.dishid),
    user_id: Number(req.body.userid),
    quantity: Number(req.body.quantity),
  };
  OrdersService.createOrUpdateWithObj(order).then((newOrder) => {
    res.json(newOrder)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

web.get('/edit/:id', (req, res, next) => {
  OrdersService.getById(Number(req.params.id)).then((order) => {
    res.render('../views/orders/edit', {
      order: order.toJSON()
    });
  });
});

web.get('/:id', (req, res, next) => {
    OrdersService.getById(Number(req.params.id)).then((order) => {
      res.render('../views/orders/show', {
         order: order.toJSON()
      });
    });    
});

api.delete('/:id', (req, res, next) => {
    OrdersService.deleteById(Number(req.params.id)).then((order) => {
      res.json({ order: order });
    });    
});

api.get('/:id/events', helpers.requireAuthentication, (req, res, next) => {
  OrdersService.fetchByEventId(req.params.id).then((orders)=> {
    res.json(orders);
  }).catch();
});

module.exports = {
    api: api,
    web: web
};