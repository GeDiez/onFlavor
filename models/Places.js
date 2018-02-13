const bookshelf = require('../bookshelf');

const compose = require('../utils/compose');
const resFormat = require('../utils/responseFormat');
const validationPlaces = require('../helpers/validationsPlaces');
const validationDishes = require('../helpers/validationsDishes');

const Places = bookshelf.Model.extend(
  {
    tableName: 'places',
    uuid: true,
    events: function() {
      const Events = require('./Events');
      return this.hasMany(Events, 'place_id');
    },
    dishes: function() {
      const Dishes = require('./Dishes');
      return this.hasMany(Dishes, 'place_id');
    },
  },
  {
    getById: async function(uuid) {
      try {
        const place = await this.forge({ id: uuid }).fetch({
          withRelated: ['dishes'],
        });
        if (!place)
          return resFormat(404, {
            error: `el lugar con uuid: ${uuid} no existe`,
          });
        return resFormat(200, null, { place });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    getAll: async function() {
      try {
        const places = await this.fetchAll({
          withRelated: ['dishes'],
        });
        return resFormat(200, null, { places });
      } catch (error) {
        return resFormat(500, 'Error en el servidor: ' + error);
      }
    },
    create: async function(place) {
      //Apply validations
      const validate = compose(
        validationPlaces.fieldPlace,
        validationPlaces.fieldsRequireds,
      )({ place, msgs: [] });
      if (validate.msgs.length > 0) return resFormat(400, validate.msgs);
      //try create a place
      try {
        const newPlace = await this.forge(place, {
          hasTimestamps: true,
        }).save();
        if (!newPlace) return resFormat(400, 'no se pudo crear');
        return resFormat(201, null, { place: newPlace });
      } catch (error) {
        return resFormat(500, 'error en el servidor: ' + error);
      }
    },
    update: async function({ uuid, place }) {
      //Apply validations
      const validate = compose(validationPlaces.fieldPlace)({
        place,
        msgs: [],
      });
      if (validate.msgs.length > 0) return resFormat(400, validate.msgs);
      //try update place
      try {
        const findPlace = await this.where('id', uuid).fetch();
        if (!findPlace)
          return resFormat(404, 'no existe un lugar con ese uuid');
        const updatedPlace = await findPlace.save(place, {
          method: 'update',
          patch: true,
        });
        return resFormat(200, null, { place: updatedPlace });
      } catch (error) {
        return resFormat(500, 'error en el servidor: ' + error);
      }
    },
    getDishes: async function(uuid) {
      try {
        const place = await this.forge({ id: uuid }).fetch();
        if (!place)
          return resFormat(
            404,
            'el lugar o place no existe en la base de datos',
          );
        const dishes = await place.dishes().fetch();
        return resFormat(200, null, { dishes });
      } catch (error) {
        return resFormat(500, 'error en el servidor: ' + error);
      }
    },
    addDishes: async function({ uuidPlace, dishes }) {
      //Apply validations to dishes
      const compose = require('../utils/compose');
      const validate = compose(validationDishes.fieldsRequireds)({
        dishes,
        msgs: [],
      });
      if (validate.msgs.length > 0) return resFormat(400, validate.msgs);
      try {
        const place = await this.forge({ id: uuidPlace }).fetch();
        if (!place)
          return resFormat(
            404,
            'el lugar o place no existe en la base de datos',
          );
        const collectionDishes = place.dishes().set(dishes, {
          hasTimestamps: true,
        });
        const dishesSaved = await collectionDishes.invokeThen('save', {
          place_id: uuidPlace,
        });
        return resFormat(201, null, { dishes: dishesSaved });
      } catch (error) {
        return resFormat(500, 'error en el servidor: ' + error);
      }
    },
  },
);

// const Places = {
//   getPlaceById: async id => {
//     const place = await dataSource.getPlaceById(id);
//     return place;
//   },
//   getPlaces: async () => {
//     return await dataSource.getPlaces();
//   },
//   updatePlace: async ({ id, place }) => {
//     return await dataSource.updatePlace({ id, place });
//   },
//   createPlace: async place => {
//     return await dataSource.createPlace(place);
//   },
//   deletePlace: async id => {
//     return await dataSource.deletePlace(id);
//   },
// };

module.exports = Places;
