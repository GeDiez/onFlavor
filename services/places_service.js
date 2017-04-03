const bookshelf = require('../bookshelf');
const Place = require('../models/Place');
const Dish = require('../models/Dish');
const knex = bookshelf.knex;

module.exports = {
  fetchPlaces: () => {
    return new Promise((resolve, reject)=>{
      Place.fetchAll().then((places)=>{
        resolve(places.toJSON());
      });
    });
  },

  fetchPlaceDishes: () => {
    return new Promise((resolve, reject) => {
      Place.fetchAll({ withRelated: ['dishes']}).then(dishes => {
        if(dishes){
          resolve(dishes);
        }
        else {
          resolve({error: "Not related dishes in that place"});
        }
      });
    })
  },

  createOrUpdateWithObj: (place) => {
    return new Promise((resolve, reject) => {
      if (!place.id) {
        new Place().save(place).then((place) => {
          resolve(place);
        });
      } else {
        Place.where('id',place.id).fetch().then((localPlace) => {
          if(localPlace){
            localPlace.save(place).then((newPlace) => {
              resolve(newPlace);
            });
          }
          else {
            resolve({error: 'Place not found'});
          }
        }).catch((error) => {reject(error)});
      }
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Place.where('id', id).fetch({ withRelated:['dishes'] }).then(place => {
        if(place){
          resolve(place);
        }
        else {
          resolve({error: "Place not found"});
        }
      }).catch((error) => {reject(error)});
    })
  },

  deleteById: (placeId) => {
    return new Promise((resolve, reject) => {
      Place.where({ id: placeId }).destroy().then(place => {
        if(place){
          resolve({message: 'Place deleted'});
        }
        else {
          resolve({error: 'Place not found'});
        }
      })
    })
  }

}
