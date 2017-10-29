const express = require('express');
const dishes = express.Router()
const DishesService = require('../services/dishes_service');
const helpers = require('../lib/helpers');

dishes.use(helpers.requireAuthentication);

dishes.get('/', (req, res, next) => {
  DishesService.fetch().then((dishes)=> {
    res.json(dishes);
  });
});

dishes.post('/', (req, res, next) =>{
  const dish = {
    place_id: req.body.place_id,
    name: req.body.name,
    price: req.body.price,
  };
  DishesService.createOrUpdateWithObj(dish).then((message) => {
    res.json(message);
  });
});

dishes.put('/:id', (req, res, next) => {
  const dish = {
    id: Number(req.params.id),
    place_id: Number(req.body.place_id),
    name: req.body.name,
    price: req.body.price
  };
  DishesService.createOrUpdateWithObj(dish).then((newDish) => {
    res.json(newDish)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

dishes.delete('/:id', (req, res, next) => {
  DishesService.deleteById(req.params.id).then((dishDeleted) => {
    res.json(dishDeleted);
  })
});

dishes.get('/:id', (req, res, next) => {
  DishesService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});


module.exports = dishes;