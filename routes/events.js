const express = require('express');
const api = express.Router();
const web = express.Router();
const EventsService = require('../services/events_service');

api.get('/', (req, res, next) => {
  EventsService.fetch().then((orders)=> {
    res.json(orders);
  }).catch();
});

web.get('/', (req, res, next) => {
    EventsService.fetch().then((events) => {
      res.render('../views/events/index', {
        events: events
      });
    });
});

module.exports = {
    api: api,
    web: web
};