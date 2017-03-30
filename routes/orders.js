const express = require('express');
const api = express.Router();
const web = express.Router();
const OrdersService = require('../services/orders_service');

api.get('/', (req, res, next) => {
  OrdersService.fetch().then((orders)=> {
    res.json(orders);
  }).catch();
});

api.post('/', (req, res, next) =>{
  const order = {
    event_id: Number(req.body.eventid),
    dish_id: Number(req.body.dishid),
    user_id: Number(req.body.userid),
    quantity: Number(req.body.quantity),
  };
  OrdersService.createOrUpdateWithObj(order).then((message) => {
    res.json(message);
  });
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

// web.get('/:id', (req, res, next) => {
//     OrdersService.fetchByEventId(Number(req.params.id)).then((orders) => {
//       res.render('../views/orders/index', {
//         orders: orders
//       });
//     });    
// });
module.exports = {
    api: api,
    web: web
};