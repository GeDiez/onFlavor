const modelEvents = require('../models/modelEvents');

const serviceEvents = () => {
  return {
    getEventById: async id => {
      return await modelEvents().getEventById(id);
    },
    getEvents: async () => {
      return await modelEvents().getEvents();
    },
    updateEvent: async event => {
      return await modelEvents().updateEvent(event);
    },
    createEvent: async () => {},
  };
};

module.exports = serviceEvents;
