const express = require('express');
const api = express.Router();
const web = express.Router();
const PlacesService = require('../services/places_service');
const helpers = require('../lib/helpers');

api.get('/', helpers.requireAuthentication, (req, res, next) => {
  PlacesService.fetchPlaceDishes().then((places)=> {
    res.json(places);
  }).catch();
});

web.get('/', helpers.requireAuthentication, function(req, res, next) {
    PlacesService.fetch().then((places) => {
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
    res.status(414).json(error);
  })
});

web.post('/edit/:id', helpers.requireAuthentication, (req, res, next) => {
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