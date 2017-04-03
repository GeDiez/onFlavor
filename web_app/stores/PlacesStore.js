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
      .get(`/api/places/all`)
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

  unsuscribe() {
    ajaxRequests.forEach(req => {
      if (req.hasOwnProperty('abort')) {
        req.abort();
      }
    });
    ajaxRequests = [];
  },

  getDate(callback) {
    let ajaxReq = request
      .get(`/second/date`)
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