const mUsers = require('../models/Users');
const mEvents = require('../models/Events');

const routeUsers = Router => {
  Router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const result = await mUsers.getById(id);
    res.set({ 'Content-Type': 'application/json' });
    if (result.errors) {
      return res.status(result.codeStatus).json(result.errors);
    }
    res.status(result.codeStatus).json(result.data);
  });
  Router.post('/users', async (req, res) => {
    const userBody = req.body.user;
    const result = await mUsers.create(userBody);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ error: result.errors });
  });
  Router.get('/users/:uuidUser/events', async (req, res) => {
    const uuidUser = req.params.uuidUser;
    const result = await mUsers.getEvents(uuidUser);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ error: result.errors });
  });
  Router.post('/users/:uuidUser/events', async (req, res) => {
    const uuidUser = req.params.uuidUser;
    const event = req.body.event;
    const result = await mEvents.create({ uuidUser, event });
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ error: result.errors });
  });
  Router.put('/users/:uuidUser/events/:uuidEvent', async (req, res) => {
    const uuidUser = req.params.uuidUser;
    const uuidEvent = req.params.uuidEvent;
    const event = req.body.event;
    const result = await mEvents.update({ uuidUser, uuidEvent, event });
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ error: result.errors });
  });
  Router.get('/users/:uuidUser/events/', async (req, res) => {
    const uuidUser = req.params.uuidUser;
    const result = await mUsers.getEvents(uuidUser);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ error: result.errors });
  });
};

module.exports = routeUsers;
