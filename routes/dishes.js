const express = require('express');
const api = express.Router();
const web = express.Router();
const DishesService = require('../services/dishes_service');
/* GET home page. */
api.get('/', (req, res, next) => {
  DishesService.fetch().then((dishes)=> {
    res.json(dishes);
  });
});

web.get('/', function(req, res, next) {
    DishesService.fetch().then((dishes) => {
      res.render('../views/dishes/index', {
        dishes: dishes,
      });
    });    
});


api.post('/', (req, res, next) =>{
  const dish = {
    place_id: req.body.placeid,
    name: req.body.name,
    price: req.body.price,
  };
  DishesService.createOrUpdateWithObj(dish).then((message) => {
    res.json(message);
  });
});

web.get('/new', function(req, res, next) {
    res.render('../views/dishes/new');
});

web.get('/:id', (req, res, next) => {
  DishesService.getById(req.params.id).then((dish) => {
    res.render('../views/dishes/show', {
      dish: dish.toJSON()
    });
  });
});

web.post('/edit/:id', (req, res, next) => {
  const dish = {
    place_id: Number(req.body.placeid),
    id: Number(req.params.id),
    name: req.body.name,
    price: req.body.price,
  };
  DishesService.createOrUpdateWithObj(dish).then((newDish) => {
    res.json(newDish)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

web.get('/edit/:id', (req, res, next) => {
  DishesService.getById(Number(req.params.id)).then((dish) => {
    res.render('../views/dishes/edit', {
      dish: dish.toJSON()
    });
  });
});

api.put('/:id', (req, res, next) => {
  const dish = {
    id: Number(req.params.id),
    place_id: Number(req.body.place_id),
    name: req.body.name,
    price: req.body.price,
  };
  console.log(dish);
  DishesService.createOrUpdateWithObj(dish).then((newDish) => {
    res.json(newDish)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

api.delete('/:id', (req, res, next) => {
  DishesService.deleteById(req.params.id).then((dishDeleted) => {
    res.json(dishDeleted);
  })
});

api.get('/:id', (req, res, next) => {
  DishesService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

module.exports = {
    api: api,
    web: web
};