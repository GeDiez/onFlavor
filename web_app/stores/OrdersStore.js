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

  saveOrder(order, callback){
    const token = localStorage.getItem('token');
    const ajaxReq = request
    .post(`/api/orders`)
    .set('Authorization', `Bearer: ${token}`)
    .send({
      event_id: Number(order.event_id),
      dish_id: Number(order.dish_id),
      quantity: Number(order.quantity),
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

  async deleteOrderById(orderid) {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/orders/${orderid}`, {
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
  },

  fetchOrdersByEventId(id, callback) {
    const token = localStorage.getItem('token');
    const ajaxReq = request
      .get(`/api/orders/${id}/events`)
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

  async removeOrder(id) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/orders/' + id, {
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

export default OrdersStore;