const express = require('express');
const api = express.Router();
const web = express.Router();
const OrdersService = require('../services/orders_service');

api.get('/', (req, res, next) => {
  OrdersService.fetch().then((orders)=> {
    res.json(orders);
  }).catch();
});

web.get('/', function(req, res, next) {
    OrdersService.fetch().then((orders) => {
      res.render('../views/orders/index', {
        orders: orders,
      });
    });    
});

web.get('/new', function(req, res, next) {
    res.render('../views/orders/new');
});

web.get('/:id', (req, res, next) => {
    OrdersService.fetchByEventId(Number(req.params.id)).then((orders) => {
      res.render('../views/orders/index', {
        orders: orders
      });
    });    
});

module.exports = {
    api: api,
    web: web
};