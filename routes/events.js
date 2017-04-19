const express = require('express');
const api = express.Router();
const web = express.Router();
const EventsService = require('../services/events_service');
const helpers = require('../lib/helpers');

api.get('/', helpers.requireAuthentication, (req, res, next) => {
  EventsService.fetch().then((events)=> {
    res.json(events);
  }).catch();
});

api.get('/myevents', helpers.requireAuthentication, (req, res, next) => {
  EventsService.fetchByUser(req.user.id).then((events)=> {
    res.json(events);
  }).catch();
});

api.get('/:id', helpers.requireAuthentication, (req, res) => {
  const { id } = req.params;
   EventsService.getById(id)
    .then((event)=>{
      res.json(event)
    });
})

web.get('/new', function(req, res, next) {
    res.render('index');
});

web.get('/', (req, res, next) => {
  res.render('index');
});

api.post('/', helpers.requireAuthentication, (req, res, next) =>{
  const event = {
    place_id: req.body.placeid,
    group_id: req.body.groupid,
    name: req.body.name,
    description: req.body.description,
    date_time: req.body.datetime,
    created_by: req.user.id,
    id: req.body.id || null,
    image_url: req.body.url
  };
  EventsService.createOrUpdateWithObj(event).then((message) => {
    if (message.id) {
      EventsService.getById(message.id).then(result => {
        res.io.emit('events:new', result);
      });
    }
    res.json(message);
  });
});

web.get('/edit/:id', (req, res, next) => {
  res.render('index');
});

api.delete('/:id', helpers.requireAuthentication, (req, res, next) => {
  EventsService.deleteById(req.params.id).then(eventDeleted => {
    if (!eventDeleted.error) {
      res.io.emit('events:delete', { id: Number(req.params.id) });
    }
    res.json(eventDeleted);
  })
});

web.get('/:id', (req, res, next) => {
  res.render('index');
});

module.exports = {
    api: api,
    web: web
};
