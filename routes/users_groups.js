const express = require('express');
const router = express.Router();
const Users_groupsService = require('../services/users_groups_service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users_groupsService.fetch().then((users_group)=> {
    res.json(users_group);
  });
});

router.post('/', (req, res, next) =>{
  const users_group = {
    group_id: req.body.group_id,
    user_id: req.body.user_id,
  };
  Users_groupsService.createOrUpdateWithObj(users_group).then((message) => {
    res.json(message);
  });
});

router.put('/:id', (req, res, next) => {
  const user_group = {
    group_id: req.body.group_id,
    user_id: req.body.user_id,
  };
  Users_groupsService.createOrUpdateWithObj(user_group).then((newUsers_group) => {
    res.json(newUser_group)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.get('/:id', (req, res, next) => {
  Users_groupsService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

router.delete('/:id', (req, res, next) => {
  Users_groupsService.deleteById(req.params.id).then((users_groupDeleted) => {
    res.json(user_groupDeleted);
  })
});

module.exports = router;
