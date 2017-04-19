import { EventEmitter } from 'events';
import request from 'superagent';

const CHANGE_EVENT = 'change';
let ajaxRequests = [];

const EventsStore = Object.assign({}, EventEmitter.prototype, {
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

  async fetchEvents() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/events/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer: ${token}`
      }
    });
    const responseData = await response.json();
    return responseData;
    ajaxRequests.push(response);
  },

  async fetchMyEvents() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/events/myevents', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer: ${token}`
      }
    });
    const responseData = await response.json();
    return responseData;
    ajaxRequests.push(response);
  },

  async addEvent({place_id, name, description, datetime, id, url}) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer: ${token}`
      },
      body: JSON.stringify({
        placeid: place_id,
        name,
        description,
        datetime,
        id,
        url
      })
    });
  },

  async getEventById(id) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/events/' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer: ${token}`
      }
    });
    const responseData = await response.json();
    return responseData;
    ajaxRequests.push(response);
  },

  async deleteEventById(id) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/events/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer: ${token}`
      }
    });
    const responseData = await response.json();
    return responseData;
    ajaxRequests.push(response);
  }

});

export default EventsStore;
