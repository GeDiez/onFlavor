const Places = require('../models/Places');
const config = require('../config');
const path = require('path');

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
  Router.put('/places/:idplace', async (req, res) => {
    const placeId = req.params.idplace;
    const fields = req.body.place;
    res.set({ 'Content-Type': 'application/json' });
    const result = await Places.update({ placeId, place: fields });
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
  Router.post('/places/:idPlace/uploadImage', async (req, res) => {
    if (!req.files) return res.status(400).send('Ningun archivo pudo subirse.');
    const placeId = req.params.idPlace;
    const file = req.files.imagen;
    const newNameFile = `place-${placeId}-${file.name}`;
    const path_file = path.join(
      __dirname,
      '../public/images/places/',
      newNameFile,
    );
    const result = await Places.update({
      placeId,
      place: {
        image_url: `http://${config.host}${
          config.port ? ':' + config.port : ''
        }/onflavor/public/images/places/${newNameFile}`,
      },
    });
    if (result.errors) return res.status(result.codeStatus).json(result.errors);
    file.mv(path_file, function(err) {
      if (err) return res.status(500).send(err);
      res.send('File uploaded!');
    });
  });
  Router.delete('/places/:idplace', async (req, res) => {
    const placeId = req.params.idplace;
    const result = await Places.deleteById(placeId);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
  Router.delete('/places/:idplace/dishes/:iddish', async (req, res) => {
    const placeId = req.params.idplace;
    const dishId = req.params.iddish;
    const result = await Places.removeDish(placeId, dishId);
    res.set({ 'Content-Type': 'application/json' });
    if (!result.errors) return res.status(result.codeStatus).json(result.data);
    res.status(result.codeStatus).json({ errors: result.errors });
  });
};

module.exports = routePlaces;
