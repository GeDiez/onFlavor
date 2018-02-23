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
    res.set({ 'Content-Type': 'application/json' });
    if (req.query.admin) {
      const userId = req.body.userId;
      const result = await mEvents.addAdmin({ uuidEvent, uuidUser: userId });
      if (!result.errors)
        return res.status(result.codeStatus).json(result.data);
      return res.status(result.codeStatus).json({ error: result.errors });
    }
    const event = req.body.event;
    const result = await mEvents.update({ uuidUser, uuidEvent, event });
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
  Router.get('/events/:idevent/users/:iduser/orders', async (req, res) => {
    const userId = req.params.iduser;
    const eventId = req.params.idevent;
    const result = await mUsers.getOrderByEvent(userId, eventId);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.delete(
    '/events/:idevent/users/:iduser/orders/:idorder',
    async (req, res) => {
      const userId = req.params.iduser;
      const eventId = req.params.idevent;
      const orderId = req.params.idorder;
      const result = await mUsers.deleteOrder(userId, orderId, eventId);
      res.set({ 'Content-Type': 'application/json' });
      if (!result.errors)
        return res.status(result.codeStatus).json(result.data);
      res.status(result.codeStatus).json({ errors: result.errors });
    },
  );
  Router.get('/users', async (req, res) => {
    const result = await mUsers.getAll();
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ error: result.errors });
  });
};

module.exports = routeUsers;
