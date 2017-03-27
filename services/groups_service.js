const bookshelf = require('../bookshelf');
const Group = require('../models/Group');
const knex = bookshelf.knex;

module.exports = {
  fetch: () => {
    return new Promise((resolve, reject)=>{
      Group.fetchAll().then((groups)=>{
        resolve(groups.toJSON());
      });
    });
  },

  createOrUpdateWithObj: (group) => {
    return new Promise((resolve, reject) => {
      if (!group.id) {
        new Group().save(group).then((group) => {
          resolve(group);
        });
      } else {
        Group.where('id', group.id).fetch().then((localGroup) => {
          if(localGroup){
            localGroup.save(group).then((newGroup) => {
              resolve(newGroup);
            });
          }
          else {
            reject({error: 'group not found'});
          }
        }).catch((error) => {reject(error)});
      }
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Group.where('id', id).fetch().then(group => {
        resolve(group);
      });
    })
  },

  deleteById: (groupId) => {
    return new Promise((resolve, reject) => {
      Group.where('id', groupId).fetch().then(group => {
        if(group){
          group.destroy();
          resolve({message: 'group deleted'});
        }
        else {
          reject({error: 'group not found'});
        }
      })
    })
  }

}