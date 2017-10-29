
const express = require('express');
const events = express.Router();
const EventsService = require('../services/events_service');
const helpers = require('../lib/helpers');

events.use(helpers.requireAuthentication);

events.get('/', (req, res, next) => {
  EventsService.fetch().then((events)=> {
    res.json(events);
  }).catch();
});

events.get('/myevents', (req, res, next) => {
  EventsService.fetchByUser(req.user.id).then((events)=> {
    res.json(events);
  }).catch();
});

events.get('/:id', (req, res) => {
  const { id } = req.params;
   EventsService.getById(id)
    .then((event)=>{
      res.json(event)
    });
})

events.post('/', (req, res, next) =>{
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

events.delete('/:id', (req, res, next) => {
  EventsService.deleteById(req.params.id).then(eventDeleted => {
    if (!eventDeleted.error) {
      res.io.emit('events:delete', { id: Number(req.params.id) });
    }
    res.json(eventDeleted);
  })
});

module.exports = events;
