const express = require('express');
const router = express.Router();
const PlacesService = require('../services/places_service');
const helpers = require('../lib/helpers');


/* GET home page. */
//router.get('/', helpers.requireAuthentication, (req, res, next) => {

router.get('/', (req, res, next) => {
    PlacesService.fetchPlaces().then((newPlace) => {
      res.render('../views/index', {
        places: newPlace,
      });
    });    
});

module.exports = router;
