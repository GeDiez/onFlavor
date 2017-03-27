const express = require('express');
const api = express.Router();
const web = express.Router();
const PlacesService = require('../services/places_service');
/* GET home page. */

api.get('/', (req, res, next) => {
  PlacesService.fetch().then((places)=> {
    res.json(places);
  });
});

web.get('/', function(req, res, next) {
    PlacesService.fetch().then((newPlace) => {
      res.render('../views/places/place', {
        places: newPlace,
      });
    });    
});

api.get('/:id', (req, res, next) => {
  PlacesService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

api.post('/', (req, res, next) =>{
  console.log(req.body.name);
  const place = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude
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
    id: req.params.id
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

//module.exports = api, web;
module.exports = {
    api: api,
    web: web
};