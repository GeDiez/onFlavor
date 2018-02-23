const Events = require('../models/Events');
const Orders = require('../models/Orders');
const sendMessagePush = require('../tools/oneSignal/sendMessage');

const config = require('../config');
const path = require('path');

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
  Router.post('/events/:idEvent/uploadImage', async (req, res) => {
    if (!req.files) return res.status(400).send('Ningun archivo pudo subirse.');
    const idEvent = req.params.idEvent;
    const file = req.files.imagen;
    const newNameFile = `event-${idEvent}-${file.name}`;
    const path_file = path.join(
      __dirname,
      '../public/images/events/',
      newNameFile,
    );
    file.mv(path_file, function(err) {
      if (err) return res.status(500).send(err);
      res.send('File uploaded!');
    });
    await Events.update({
      uuidEvent: idEvent,
      event: {
        image_url: `http://${config.host}${
          config.port ? ':' + config.port : ''
        }/onflavor/public/images/events/${newNameFile}`,
      },
    });
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
  Router.get('/events/:idEvent/orders', async (req, res) => {
    const idEvent = req.params.idEvent;
    const result = await Orders.getByEvent(idEvent);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.delete('/users/:iduser/events/:idevent', async (req, res) => {
    const eventId = req.params.idevent;
    const result = await Events.deleteById(eventId);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) {
      sendMessagePush({
        app_id: 'e2152bd4-67b7-4e27-83e8-2d60592353ef',
        contents: { en: 'Se ha eliminado un evento' },
        included_segments: ['All'],
      });
      return res.status(result.codeStatus).json(result.data);
    }
    res.status(result.codeStatus).json({ errors: result.errors });
  });
};

module.exports = routeEvents;
