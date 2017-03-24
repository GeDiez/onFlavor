const express = require('express');
const router = express.Router();
const PlacesService = require('../services/places_service');
/* GET home page. */
router.get('/currents', (req, res, next) => {
  PlacesService.fetch().then((places)=>{
    res.json(places);
  });
});

module.exports = router;
