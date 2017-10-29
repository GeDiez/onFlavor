const express = require('express');
const groups = express.Router();
const GroupsService = require('../services/groups_service');
const helpers = require('../lib/helpers');

groups.use(helpers.requireAuthentication);

groups.get('/', helpers.requireAuthentication, (req, res, next) => {
  GroupsService.fetch().then((groups)=> {
    res.json(groups);
  });
});

groups.post('/', helpers.requireAuthentication, (req, res, next) =>{
  const group = {
    name: req.body.name,
  };
  GroupsService.createOrUpdateWithObj(group).then((message) => {
    res.json(message);
  });
});

groups.get('/:id', helpers.requireAuthentication, (req, res, next) => {
  GroupsService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});

groups.put('/:id', helpers.requireAuthentication, (req, res, next) => {
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

groups.delete('/:id', helpers.requireAuthentication, (req, res, next) => {
  GroupsService.deleteById(req.params.id).then((groupDeleted) => {
    res.json(groupDeleted);
  })
});

module.exports = groups;