const express = require('express');
const api = express.Router();
const web = express.Router();
const GroupsService = require('../services/groups_service');
/* GET home page. */
api.get('/', (req, res, next) => {
  GroupsService.fetch().then((groups)=> {
    res.json(groups);
  });
});

web.get('/', function(req, res, next) {
    GroupsService.fetch().then((groups) => {
      res.render('../views/groups/index', {
        groups: groups,
      });
    });    
});

api.post('/', (req, res, next) =>{
  const group = {
    name: req.body.name,
  };
  GroupsService.createOrUpdateWithObj(group).then((message) => {
    res.json(message);
  });
});


web.get('/new', function(req, res, next) {
    res.render('../views/groups/new');
});

web.get('/:id', (req, res, next) => {
  GroupsService.getById(req.params.id).then((group) => {
    res.render('../views/groups/show', {
      group: group.toJSON()
    });
  });
});

web.get('/edit/:id', (req, res, next) => {
  GroupsService.getById(Number(req.params.id)).then((group) => {
    res.render('../views/groups/edit', {
      group: group.toJSON()
    });
  });
});

web.post('/edit/:id', (req, res, next) => {
  const group = {
    name: req.body.name,
    id: req.params.id,
  };
  GroupsService.createOrUpdateWithObj(group).then((newGroup) => {
    res.json(newGroup)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

api.get('/:id', (req, res, next) => {
  GroupsService.getById(req.params.id).then((response) => {
    res.json(response);
  })
});



api.put('/:id', (req, res, next) => {
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

api.delete('/:id', (req, res, next) => {
  GroupsService.deleteById(req.params.id).then((groupDeleted) => {
    res.json(groupDeleted);
  })
});

module.exports = {
    api: api,
    web: web
};