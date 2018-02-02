const modelEvents = require('../models/modelEvents');

const routeEvents = Router => {
  Router.get('/events/:id', async (req, res) => {
    const id = req.params.id;
    const event = await modelEvents.getEventById(id);
    res.set({ 'Content-Type': 'application/json' });
    if (event.error) {
      res.status(400).json(event);
    }
    res.status(200).json(event);
  });
  Router.get('/events', async (req, res) => {
    const events = await modelEvents.getEvents();
    res.set({ 'Content-Type': 'application/json' });
    res.status(200).send(events);
  });
  Router.post('/events', async (req, res) => {
    const eventReq = req.body;
    const event = await modelEvents.createEvent(eventReq);
    res.set({ 'Content-Type': 'application/json' });
    if (event.error) {
      res.status(409).json(event);
    }
    res.status(200).json(event);
  });
  Router.put('/events/:id', async (req, res) => {
    const id = req.params.id;
    const event = req.body;
    const updateEvent = await modelEvents.updateEvent({ id, event });
    res.set({ 'Content-Type': 'application/json' });
    if (updateEvent.error) {
      return res.status(404).send(updateEvent.error);
    }
    res.status(200).send(updateEvent);
  });
};

module.exports = routeEvents;
