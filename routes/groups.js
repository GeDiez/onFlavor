const express = require('express');
const router = express.Router();
const GroupsService = require('../services/groups_service');
/* GET home page. */
router.get('/', (req, res, next) => {
  GroupsService.fetch().then((groups)=> {
    res.json(groups);
  });
});

router.get('/:id', (req, res, next) => {
  GroupsService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

router.post('/', (req, res, next) =>{
  const group = {
    name: req.body.name,
  };
  GroupsService.createOrUpdateWithObj(group).then((message) => {
    res.json(message);
  });
});

router.put('/:id', (req, res, next) => {
  const group = {
    id: req.params.id,
    name: req.body.name,
  };
  GroupsService.createOrUpdateWithObj(group).then((newGroup) => {
    res.json(newGroup)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.delete('/:id', (req, res, next) => {
  GroupsService.deleteById(req.params.id).then((groupDeleted) => {
    res.json(groupDeleted);
  })
});

module.exports = router;