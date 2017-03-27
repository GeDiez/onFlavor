var express = require('express');
var router = express.Router();
const PlacesService = require('../services/places_service');

/* GET home page. */
router.get('/', function(req, res, next) {
    PlacesService.fetch().then((newPlace) => {
      res.render('../views/index', {
        places: newPlace,
      });
    });    
});

module.exports = router;
