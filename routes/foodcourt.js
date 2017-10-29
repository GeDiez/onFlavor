const express = require('express');
const foodcourt = express.Router();
const PlacesService = require('../services/places_service');

foodcourt.get('/currents', (req, res, next) => {
  PlacesService.fetch().then((places)=>{
    res.json(places);
  });
});

module.exports = foodcourt;
