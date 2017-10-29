const express = require('express');
const places = express.Router();
const PlacesService = require('../services/places_service');
const helpers = require('../lib/helpers');
const Place = require('../models/Place');

places.use(helpers.requireAuthentication);

places.get('/', function(req, res, next) {
  Place.fetchAll().then(function(places){
    res.json(places);
  });
});

places.post('/', (req, res, next) =>{
  const place = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description,
    image_url: req.body.url,
    id: req.body.placeid,
  };
  PlacesService.createOrUpdateWithObj(place).then((message) => {
    res.json(message);
  });
});

places.put('/:id',(req, res, next) => {
  const place = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    id: req.params.id,
    description: req.body.description,
  };
  PlacesService.createOrUpdateWithObj(place).then((newPlace) => {
    res.json(newPlace)
  }).catch((error) => {
    res.status(414).json(error);
  })
});

places.delete('/:id', (req, res, next) => {
  PlacesService.deleteById(req.params.id).then((placeDeleted) => {
    res.json(placeDeleted);
  }).catch(error => res.json({ error }));
});

places.get('/:id', (req, res, next) => {
  PlacesService.getById(req.params.id).then((response) => {
    res.json(response);
  });
});

module.exports = places;
