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

  async register(values) {
     if (values) {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          full_name: values.name,
          email: values.email
        })
      });
      const responseData = await response.json();

      return await this.login(values);
     }
  },

  async login(values) {
    if (values) {
      const response = await fetch('/api/users/authorize', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        })
      });
      if(response.ok) {
        const responseData = await response.json();
        localStorage.setItem('full_name', responseData.full_name);
        localStorage.setItem('email', responseData.email);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('role', responseData.role);
        localStorage.setItem('username', responseData.username)
        this.emitChange();
      }
      return response
    }
  },

  logout() {
    localStorage.removeItem('full_name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  }

});

export default PlacesStore;
