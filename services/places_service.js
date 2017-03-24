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
  }

}