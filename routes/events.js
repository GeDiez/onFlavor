const express = require('express');
const api = express.Router();
const web = express.Router();
const EventsService = require('../services/events_service');

api.get('/', (req, res, next) => {
  EventsService.fetch().then((events)=> {
    res.json(events);
  }).catch();
});

web.get('/new', function(req, res, next) {
    res.render('../views/events/new');
});

web.get('/', (req, res, next) => {
  res.render('index');
});

api.post('/', (req, res, next) =>{
  console.log("DATA place group" + req.body.placeid+" "+ req.body.groupid );
  const event = {
    place_id: req.body.placeid,
    group_id: req.body.groupid,
    name: req.body.name,
    description: req.body.description,
    date_time: req.body.datetime,
  };
  console.log(event);
  EventsService.createOrUpdateWithObj(event).then((message) => {
    res.json(message);
  });
});
web.get('/edit/:id', (req, res, next) => {
  EventsService.getById(Number(req.params.id)).then((event) => {
    res.render('../views/events/edit', {
      event: event.toJSON()
    });
  });
});

web.post('/edit/:id', (req, res, next) => {
  const event = {
    id: Number(req.params.id),
    place_id: Number(req.body.placeid),
    group_id: Number(req.body.groupid),
    name: req.body.name,
    description: req.body.description,
    date_time: req.body.datetime,
  };
  console.log(event);
  EventsService.createOrUpdateWithObj(event).then((event) => {
    res.json(event)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

api.delete('/:id', (req, res, next) => {
  EventsService.deleteById(req.params.id).then((eventDeleted) => {
    res.json(eventDeleted);
  })
});

web.get('/:id', (req, res, next) => {
  EventsService.getById(req.params.id).then((event) => {
    res.render('../views/events/show', {
      event: event.toJSON()
    });
  });
});

module.exports = {
    api: api,
    web: web
};