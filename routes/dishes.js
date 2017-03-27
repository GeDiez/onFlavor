const express = require('express');
const router = express.Router();
const DishesService = require('../services/dishes_service');
/* GET home page. */
router.get('/', (req, res, next) => {
  DishesService.fetch().then((dishes)=> {
    res.json(dishes);
  });
});

router.get('/:id', (req, res, next) => {
  DishesService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

router.post('/', (req, res, next) =>{
  const dish = {
    place_id: req.body.place_id,
    name: req.body.name,
    price: req.body.price,
  };
  DishesService.createOrUpdateWithObj(dish).then((message) => {
    res.json(message);
  });
});

router.put('/:id', (req, res, next) => {
  const dish = {
    id: req.params.id,
    place_id: req.body.place_id,
    name: req.body.name,
    price: req.body.price,
  };
  DishesService.createOrUpdateWithObj(dish).then((newDish) => {
    res.json(newDish)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.delete('/:id', (req, res, next) => {
  DishesService.deleteById(req.params.id).then((dishDeleted) => {
    res.json(dishDeleted);
  })
});

module.exports = router;