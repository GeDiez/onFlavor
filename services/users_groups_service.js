const bookshelf = require('../bookshelf');
const Users_group = require('../models/Users_group');
const knex = bookshelf.knex;

module.exports = {
  fetch: () => {
    return new Promise((resolve, reject) => {
      Users_group.fetchAll().then((users_groups) => {
        resolve(users_groups.toJSON());
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Users_group.where('id', id).fetch().then(users_group => {
        resolve(users_group);
      });
    })
  },

  createOrUpdateWithObj: (users_group) => {
    return new Promise((resolve, reject) => {
      if (!users_group.id) {
        new Users_group().save(users_group).then((users_group) => {
          resolve(users_group);
        });
      } else {
        Users_group.where('id', users_group.id).fetch().then((localUsers_group) => {
          if(localUsers_group){
            localUsers_group.save(users_group).then((newUsers_group) => {
              resolve(newUsers_group);
            });
          }
          else {
            reject({error: 'Users_group not found'});
          }
        }).catch((error) => {reject(error)});
      }
    })
  },

    deleteById: (users_groupId) => {
    return new Promise((resolve, reject) => {
      Users_group.where('id', users_groupId).fetch().then(users_groupId => {
        if(users_groupId){
          users_groupId.destroy();
          resolve({message: 'users_groupId deleted'});
        }
        else {
          reject({error: 'users_groupId not found'});
        }
      })
    })
  }

}