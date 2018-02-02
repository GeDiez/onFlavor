const modelPlaces = require('../models/modelPlaces');

const routePlaces = Router => {
  Router.get('/places/:id', async (req, res) => {
    const id = req.params.id;
    const place = await modelPlaces.getPlaceById(id);
    res.set({ 'Content-Type': 'application/json' });
    if (place.error) {
      res.status(400).json(place);
    }
    res.status(200).send(place);
  });
  Router.get('/places', async (req, res) => {
    const places = await modelPlaces.getPlaces();
    res.set({ 'Content-Type': 'application/json' });
    res.status(200).send(places);
  });
  Router.post('/places', async (req, res) => {
    const placeReq = req.body;
    const place = await modelPlaces.createPlace(placeReq);
    res.set({ 'Content-Type': 'application/json' });
    if (place.error) {
      res.status(409).json(place);
    }
    res.status(200).json(place);
  });
  Router.put('/places/:id', async (req, res) => {
    const id = req.params.id;
    const place = req.body;
    const updatePlace = await modelPlaces.updatePlace({ id, place });
    res.set({ 'Content-Type': 'application/json' });
    if (updatePlace.error) {
      return res.status(404).send(updatePlace.error);
    }
    res.status(200).send(updatePlace);
  });
  Router.delete('/places/:id', async (req, res) => {
    const id = req.params.id;
    const deleteplace = await modelPlaces.deletePlace(id);
    if (deleteplace.error) {
      res.status(404).json(deleteplace);
    }
    res.status(200).json(deleteplace);
  });
};

module.exports = routePlaces;
