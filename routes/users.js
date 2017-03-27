const express = require('express');
const router = express.Router();
const UsersService = require('../services/users_service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  UsersService.fetch().then((users)=> {
    res.json(users);
  });
});

router.get('/:id', (req, res, next) => {
  UsersService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

router.post('/', (req, res, next) =>{
  const user = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };
  UsersService.createOrUpdateWithObj(user).then((message) => {
    res.json(message);
  });
});

router.put('/:id', (req, res, next) => {
  const user = {
    id: req.params.id,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  UsersService.createOrUpdateWithObj(user).then((newUser) => {
    res.json(newUser)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.delete('/:id', (req, res, next) => {
  UsersService.deleteById(req.params.id).then((userDeleted) => {
    res.json(userDeleted);
  })
});

module.exports = router;
