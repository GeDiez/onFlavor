const modelUsers = require('../models/modelUsers');

const routeUsers = Router => {
  Router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const event = await modelUsers.getEventById(id);
    res.set({ 'Content-Type': 'application/json' });
    if (event.error) {
      res.status(400).json(event);
    }
    res.status(200).send(event);
  });
  Router.get('/users/:id/events/', async (req, res) => {
    const userId = parseInt(req.params.id);
    const events = await modelUsers.getEvents({ userId });
    res.set({ 'Content-Type': 'application/json' });
    if (events.error) {
      return res.status(404).json(events);
    }
    res.status(200).json(events);
  });
  Router.post('/users', async (req, res) => {
    const user_req = req.body;
    const new_user = await modelUsers.create({ user: user_req });
    res.set({ 'Content-Type': 'application/json' });
    if (new_user.error) res.status(409).json(new_user);
    res.status(201).json(new_user);
  });
};

module.exports = routeUsers;
