const express = require('express');
const api = express.Router();
const web = express.Router();
const PlacesService = require('../services/places_service');
var bookshelf = require('../bookshelf');
const helpers = require('../lib/helpers');
var Place = require('../models/Place');

// api.get('/', helpers.requireAuthentication, (req, res, next) => {
//   PlacesService.fetchPlaceDishes().then((places)=> {
//     res.json(places);
//   }).catch();
// });
web.get('/', function(req, res, next) {
  res.render('index');
});

api.get('/', function(req, res, next) {
  Place.fetchAll().then(function(places){
    res.json(places);
  });
});

web.get('/', function(req, res, next) {
    PlacesService.fetchPlaces().then((places) => {
      console.log("Route: "+ places);
      res.render('../views/places/index', {
        places: places,
      });
    });    
});

web.get('/new', helpers.requireAuthentication, function(req, res, next) {
    res.render('../views/places/new');
});

api.post('/', (req, res, next) =>{
  const place = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description,
    id: req.body.placeid,
  };
  PlacesService.createOrUpdateWithObj(place).then((message) => {
    res.json(message);
  });
});

api.put('/:id', (req, res, next) => {
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

web.post('/edit/:id', helpers.requireAuthentication, (req, res, next) => {
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
    res.status(500).json(error);
  })
});

api.delete('/:id', (req, res, next) => {
  PlacesService.deleteById(req.params.id).then((placeDeleted) => {
    res.json(placeDeleted);
  })
});

web.delete('/places/:id', helpers.requireAuthentication, (req, res, next) => {
  PlacesService.deleteById(req.params.id).then((placeDeleted) => {
    res.json(placeDeleted);
  })
});

web.get('/edit/:id', helpers.requireAuthentication, (req, res, next) => {
  PlacesService.getById(Number(req.params.id)).then((place) => {
    res.render('../views/places/edit', {
      place: place.toJSON()
    });
  });
});

api.get('/:id', (req, res, next) => {
  PlacesService.getById(req.params.id).then((response) => {
    res.json(response);
  });
});

web.get('/:id', helpers.requireAuthentication, (req, res, next) => {
  PlacesService.getById(req.params.id).then((place) => {
    res.render('../views/places/show', {
      place: place.toJSON()
    });
  });
});

//module.exports = api, web;
module.exports = {
    api: api,
    web: web
};