const bookshelf = require('../bookshelf');

const dishesTable = bookshelf.Model.extend(
  {
    tableName: 'dishes',
    places: function() {
      const Place = require('./placesBS');
      return this.belongTo(Place);
    },
    orders: function() {
      const ordersDishes = require('./orders_dishesBS');
      const orders = require('./dishesBS');
      return this.belongsToMany(orders).through(ordersDishes);
    },
  },
  {
    create: async function({ placeId, dishes }) {
      // if (!placeId || !name || !price) return { error: 'faltan campos' };
      try {
        const collectiondishes = this.collection(dishes, {
          hasTimestamps: true,
        });
        const collectionSaved = await collectiondishes.invokeThen('save', {
          place_id: placeId,
        });
        return { dishes: collectionSaved };
      } catch (error) {
        return {
          error: 'fallo al crear el platillo' + error,
        };
      }
    },
    update: async function({ dishId, dish }) {
      try {
        const _dish = await this.forge(
          { id: dishId, ...dish },
          { hasTimestamps: true },
        ).save();
        return { dish: _dish };
      } catch (error) {
        return {
          error: 'fallo al actualizar los platillos ' + error,
        };
      }
    },
    deleteById: async function(dishId) {
      try {
        const dish = await this.forge({ id: dishId }).fetch();
        if (!dish) return { error: 'no existe el platillo' };
        await dish.clone().destroy();
        return { dish };
      } catch (error) {
        return {
          error: 'no se pudo eliminar el platillo ' + error,
        };
      }
    },
  },
);

module.exports = dishesTable;
