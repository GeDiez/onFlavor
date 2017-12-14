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

  unsuscribe() {
    ajaxRequests.forEach(req => {
      if (req.hasOwnProperty('abort')) {
        req.abort();
      }
    });
    ajaxRequests = [];
  },

  fetchPlaces(callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
      .get(`/api/places/`)
      .set('Authorization', `Bearer: ${token}`)
      .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      });
    ajaxRequests.push(ajaxReq);
  },

  fetchPlaceDishes(id, callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
      .get(`/api/places/${id}/dishes`)
      .set('Authorization', `Bearer: ${token}`)
      .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      });
    ajaxRequests.push(ajaxReq);
  },

  getById(id, callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
      .get(`/api/places/${id}`)
      .set('Authorization', `Bearer: ${token}`)
      .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      });
    ajaxRequests.push(ajaxReq);
  },

  savePlace(place, callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
      .post(`/api/places`)
      .set('Authorization', `Bearer: ${token}`)
      .send({
        placeid: place.placeid,
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
        description: place.description,
        url: place.url,
      })
      .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      });
    ajaxRequests.push(ajaxReq);
  },

  deletePlace(id, callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
      .delete(`/api/places/${id}`)
      .set('Authorization', `Bearer: ${token}`)
      .end((err, res) => {
        if (err || !res.ok) {
          callback({ error: true });
        } else {
          callback(res.body);
        }
      });
    ajaxRequests.push(ajaxReq);
  },
});

export default PlacesStore;
