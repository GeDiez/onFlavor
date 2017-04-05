import { EventEmitter } from 'events';
import request from 'superagent';

const CHANGE_EVENT = 'change'; 
let ajaxRequests = [];

const PlacesStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  fetchPlaces(callback) {
    let ajaxReq = request
      .get(`/api/places/`)
      .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      });
      //console.log("Store: "+ places);
    ajaxRequests.push(ajaxReq);
  },

  getById(id, callback){
    let ajaxReq = request
    .get(`/api/places/${id}`)
    .end((err, res) => {
      if (err || !res.ok) {
        callback('error');
      } else {
        callback(res.body);
      }
    });
    ajaxRequests.push(ajaxReq);
  },

  savePlace(place, callback){
    let ajaxReq = request
    .post(`/api/places`)
    .send({ 
      placeid: place.placeid,
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      description: place.description,
    })
    .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      })
    ajaxRequests.push(ajaxReq);
  },

  unsuscribe() {
    ajaxRequests.forEach(req => {
      if (req.hasOwnProperty('abort')) {
        req.abort();
      }
    });
    ajaxRequests = [];
  },

  deletePlace(id, callback) {
    let ajaxReq = request
      .delete(`/api/places/${id}`)
      .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      });
    ajaxRequests.push(ajaxReq);
  }

});

export default PlacesStore;