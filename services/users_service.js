const bookshelf = require('../bookshelf');
const User = require('../models/User');
const knex = bookshelf.knex;

module.exports = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      User.fetchAll().then((users) => {
        resolve(users.toJSON());
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      User.where('id', id).fetch().then(user => {
        resolve(user);
      });
    })
  },

  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      User.where('email', email).fetch().then(user => {
        resolve(user);
      });
    })
  },

  createOrUpdateWithObj: (user) => {
    return new Promise((resolve, reject) => {
      if (!user.id) {
        new User().save(user).then((user) => {
          resolve(user);
        });
      } else {
        User.where('id', user.id).fetch().then((localUser) => {
          if(localUser){
            localUser.save(user).then((newUser) => {
              resolve(newUser);
            });
          }
          else {
            reject({error: 'User not found'});
          }
        }).catch((error) => {reject(error)});
      }
    })
  },

    deleteById: (userId) => {
    return new Promise((resolve, reject) => {
      User.where('id', userId).fetch().then(user => {
        if(user){
          user.destroy();
          resolve({message: 'user deleted'});
        }
        else {
          reject({error: 'user not found'});
        }
      })
    })
  }

}
