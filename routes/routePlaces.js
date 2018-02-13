const Places = require('../models/Places');
const Dishes = require('../models/Dishes');

const routePlaces = Router => {
  Router.get('/places/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const result = await Places.getById(uuid);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json(result.errors);
  });
  Router.get('/places', async (req, res) => {
    const result = await Places.getAll();
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.post('/places', async (req, res) => {
    const place = req.body.place;
    const result = await Places.create(place);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.put('/places/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const fields = req.body.place;
    res.set({ 'Content-Type': 'application/json' });
    const result = await Places.update({ uuid, place: fields });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.post('/places/:uuid/dishes', async (req, res) => {
    const uuidPlace = req.params.uuid;
    const dishes = req.body.dishes;
    res.set({ 'Content-Type': 'application/json' });
    const result = await Places.addDishes({ uuidPlace, dishes });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.get('/places/:uuid/dishes', async (req, res) => {
    const uuidPlace = req.params.uuid;
    const result = await Places.getDishes(uuidPlace);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json(result.errors);
  });
};

module.exports = routePlaces;
