const bookshelf = require('../bookshelf');
const Dish = require('../models/Dish');
const knex = bookshelf.knex;

module.exports = {
  fetch: () => {
    return new Promise((resolve, reject)=>{
      Dish.fetchAll().then((dishes)=>{
        resolve(dishes.toJSON());
      });
    });
  },

  createOrUpdateWithObj: (dish) => {
    return new Promise((resolve, reject) => {
      if (!dish.id) {
        new Dish().save(dish).then((dish) => {
          resolve(dish);
        });
      } else {
        Dish.where('id', dish.id).fetch().then((localDish) => {
          if(localDish){
            localDish.save(dish).then((newDish) => {
              resolve(newDish);
            });
          }
          else {
            reject({error: 'Dish not found'});
          }
        }).catch((error) => {reject(error)});
      }
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Dish.where('id', id).fetch().then(dish => {
        resolve(dish);
      });
    })
  },

  deleteById: (dishId) => {
    return new Promise((resolve, reject) => {
      Dish.where('id', dishId).fetch().then(dish => {
        if(dish){
          dish.destroy();
          resolve({message: 'Dish deleted'});
        }
        else {
          reject({error: 'Dish not found'});
        }
      })
    })
  }

}