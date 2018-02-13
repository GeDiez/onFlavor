const Events = require('../models/Events');
const Orders = require('../models/Orders');

const routeEvents = Router => {
  Router.get('/events/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const result = await Events.getById(uuid);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.get('/events', async (req, res) => {
    const result = await Events.getAll();
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json(result.errors);
  });
  Router.post('/events/:uuidEvent/users/:uuidUser/orders', async (req, res) => {
    const uuidEvent = req.params.uuidEvent;
    const uuidUser = req.params.uuidUser;
    const dishes = req.body.dishes;
    const result = await Orders.create({ uuidEvent, uuidUser, dishes });
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json(result.errors);
  });
  Router.put(
    '/events/:uuidEvent/users/:uuidUser/orders/:uuidOrder',
    async (req, res) => {
      const uuidEvent = req.params.uuidEvent;
      const uuidUser = req.params.uuidUser;
      const uuidOrder = req.params.uuidOrder;
      const dishes = req.body.dishes;
      const result = await Orders.update({
        uuidEvent,
        uuidUser,
        uuidOrder,
        dishes,
      });
      res.set({ 'Content-Type': 'application/json' });
      if (!result.errors)
        return res.status(result.codeStatus).json(result.data);
      res.status(result.codeStatus).json(result.errors);
    },
  );
};

module.exports = routeEvents;
