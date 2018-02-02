const dataSource = require('../data_source/eventsBS');

const modelEvents = {
  getEventById: async id => {
    const event = await dataSource.getEventById(id);
    return event;
  },
  getEventByEmail: async email => {
    const event = await dataSource.getEventByEmail(email);
    return event;
  },
  getEvents: async () => {
    return await dataSource.getEvents();
  },
  updateEvent: async ({ id, event }) => {
    return await dataSource.updateEvent({ id, event });
  },
  createEvent: async event => {
    return await dataSource.createEvent(event);
  },
  deleteEvent: async () => {
    return await dataSource.deleteEvent;
  },
};

module.exports = modelEvents;
