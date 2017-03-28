const bookshelf = require('../bookshelf');
const Place = require('../models/Place');
const knex = bookshelf.knex;

module.exports = {
  fetch: () => {
    return new Promise((resolve, reject)=>{
      Place.fetchAll().then((places)=>{
        resolve(places.toJSON());
      });
    });
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
      Place.where('id', id).fetch().then(place => {
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
      Place.where('id', placeId).fetch().then(place => {
        if(place){
          place.destroy();
          resolve({message: 'Place deleted'});
        }
        else {
          resolve({error: 'Place not found'});
        }
      })
    })
  }

}
