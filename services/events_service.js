const bookshelf = require('../bookshelf');
const Event = require('../models/Event');
const Place = require('../models/Place');
const Group = require('../models/Group');
const knex = bookshelf.knex;

module.exports = {
  fetch: () => {
    return new Promise((resolve, reject)=>{
      Event.fetchAll({ withRelated: ['place', 'group'] }).then((events)=>{
        resolve(events.toJSON());
      });
    });
  },

  createOrUpdateWithObj: (event) => {
    return new Promise((resolve, reject) => {
      if (!event.id) {
        new Event().save(event).then((event) => {
          resolve(event);
        });
      } else {
        Event.where('id', event.id).fetch().then((localEvent) => {
          if(localEvent){
            localEvent.save(event).then((newEvent) => {
              resolve(newEvent);
            });
          }
          else {
            reject({error: 'Event not found'});
          }
        }).catch((error) => {reject(error)});
      }
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Event.where('id', id).fetch().then(event => {
        resolve(event);
      });
    })
  },

  deleteById: (eventId) => {
    return new Promise((resolve, reject) => {
      Event.where('id', eventId).fetch().then(event => {
        if(event){
          event.destroy();
          resolve({message: 'Event deleted'});
        }
        else {
          reject({error: 'Event not found'});
        }
      })
    })
  }

}