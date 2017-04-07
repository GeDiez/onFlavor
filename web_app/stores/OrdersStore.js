import { EventEmitter } from 'events';
import request from 'superagent';

const CHANGE_EVENT = 'change';
let ajaxRequests = [];

const OrdersStore = Object.assign({}, EventEmitter.prototype, {
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

  async fetchOrders() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/orders/', {
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

  async fetchOrdersByEventId(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/orders/${id}/events`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer: ${token}`
      }
    });
    const responseData = await response.json();
    return responseData;
    console.log(response);
    ajaxRequests.push(response);
  },
});

export default OrdersStore;