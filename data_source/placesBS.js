const bookshelf = require('../bookshelf');
const Events = require('./eventsBS');

const placeTable = bookshelf.Model.extend(
  {
    tableName: 'places',
    events: function() {
      this.hasMany(Events, 'place_id');
    },
  },
  {
    getPlaceById: async function(id) {
      try {
        const place = await this.where('id', id).fetch();
        if (!place) {
          return { error: 'No existe un lugar con id: ' + id };
        }
        return place.toJSON();
      } catch (error) {
        return { error: 'no se pudo completar la operacion' };
      }
    },
    createPlace: async function(place) {
      try {
        const newPlace = await this.forge(place);
        const savePlace = await newPlace.save();
        return savePlace.toJSON();
      } catch (error) {
        return {
          error:
            'no se pudo crear el evento error: no contiene los campos especificados' +
            error,
        };
      }
    },
    getPlaces: async function() {
      try {
        const places = await this.fetchAll();
        return await places.toJSON();
      } catch (error) {
        return { error: 'no se pudieron obtener los places status' + error };
      }
    },
    updatePlace: async function({ id, place }) {
      try {
        const findplace = await this.where('id', id).fetch();
        if (!findplace) {
          return {
            error: 'no existe el evento con id :' + id,
          };
        }
        const savePlace = await findplace.save(place);
        return savePlace.toJSON();
      } catch (error) {
        return {
          error:
            'no se pudo crear el lugar error: no contiene los campos especificados',
        };
      }
    },
    deletePlace: async function(id) {
      try {
        const findplace = await this.where('id', id).fetch();
        if (!findplace) {
          return { error: 'no existe el lugar con id' + id };
        }
        const deleteplace = await findplace.destroy();
        return deleteplace;
      } catch (error) {
        return {
          error: 'no se pudo eliminar el lugar error: ' + error,
        };
      }
    },
  },
);

module.exports = placeTable;
