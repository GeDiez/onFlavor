import { EventEmitter } from 'events';
import request from 'superagent';

const CHANGE_EVENT = 'change'; 
let ajaxRequests = [];

const DishStore = Object.assign({}, EventEmitter.prototype, {
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
    ajaxRequests.push(ajaxReq);
  },

  fetchPlaceDishes(id, callback) {
    let ajaxReq = request
      .get(`/api/places/${id}/dishes`)
      .end((err, res) => {
        if (err || !res.ok) {
          callback('error');
        } else {
          callback(res.body);
        }
      });
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

  saveDish(dish, callback){
    let ajaxReq = request
    .post(`/api/dishes`)
    .send({ 
      place_id: dish.place_id,
      name: dish.name,
      price: dish.price,
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

export default DishStore;