const dataSource = require('../data_source/placesBS');

const modelPlaces = {
  getPlaceById: async id => {
    const place = await dataSource.getPlaceById(id);
    return place;
  },
  getPlaces: async () => {
    return await dataSource.getPlaces();
  },
  updatePlace: async ({ id, place }) => {
    return await dataSource.updatePlace({ id, place });
  },
  createPlace: async place => {
    return await dataSource.createPlace(place);
  },
  deletePlace: async id => {
    return await dataSource.deletePlace(id);
  },
};

module.exports = modelPlaces;
