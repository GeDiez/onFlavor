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

  unsuscribe() {
    ajaxRequests.forEach(req => {
      if (req.hasOwnProperty('abort')) {
        req.abort();
      }
    });
    ajaxRequests = [];
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

  saveDish(dish, callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
    .post(`/api/dishes`)
    .set('Authorization', `Bearer: ${token}`)
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


  deletePlace(id, callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
      .delete(`/api/places/${id}`)
      .set('Authorization', `Bearer: ${token}`)
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
