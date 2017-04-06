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

web.get('/new', function(req, res, next) {
    res.render('index');
});

web.get('/', (req, res, next) => {
  res.render('index');
});

api.post('/', helpers.requireAuthentication, (req, res, next) =>{
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
  res.render('index');
});

api.delete('/:id', helpers.requireAuthentication, (req, res, next) => {
  EventsService.deleteById(req.params.id).then((eventDeleted) => {
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
