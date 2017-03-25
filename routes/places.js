const express = require('express');
const router = express.Router();
const PlacesService = require('../services/places_service');
/* GET home page. */
router.get('/', (req, res, next) => {
  PlacesService.fetch().then((places)=> {
    res.json(places);
  });
});

router.get('/:id', (req, res, next) => {
  PlacesService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

router.post('/', (req, res, next) =>{
  const place = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  PlacesService.createOrUpdateWithObj(place).then((message) => {
    res.json(message);
  });
});

router.put('/:id', (req, res, next) => {
  const place = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    id: req.params.id
  };
  PlacesService.createOrUpdateWithObj(place).then((newPlace) => {
    res.json(newPlace)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.delete('/:id', (req, res, next) => {
  PlacesService.deleteById(req.params.id).then((placeDeleted) => {
    res.json(placeDeleted);
  })
});

module.exports = router;