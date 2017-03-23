var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/currents', function(req, res, next) {
  const currentMenu = [
    {
      id: 1,
      foodType: 'vegan',
      placeName: 'shashi',
    },
    {
      id: 2,
      foodType: 'dessert',
      placeName: 'dessert factory',
    },
    {
      id: 3,
      foodType: 'meals',
      placeName: 'mikes steak',
    },
    {
      id: 4,
      foodType: 'beverages',
      placeName: 'michelada',
    }
  ];
  res.json(currentMenu);
});

module.exports = router;