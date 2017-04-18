import { EventEmitter } from 'events';
import request from 'superagent';

const CHANGE_EVENT = 'change';
let ajaxRequests = [];

let GoogleAuth; // Google Auth object.

const initClient = async () => {
  await gapi.client.init({
      'apiKey': 'AIzaSyAFIGonDMg78zwLwpfMpY7oP2pl7hWZOY0',
      'clientId': '13340905883-ftmh5vg0rgf8j2dmepsq237hp9d1cg55.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  });
  GoogleAuth = gapi.auth2.getAuthInstance();
}

const initiClientPromise = initClient();


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

  async loginWithGoogle() {
    await Promise.resolve(initiClientPromise);
    const authGoogle = await GoogleAuth.signIn();
    const response = await fetch('/api/users/authorize/google', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authGoogle.Zi)
    });
    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('full_name', responseData.full_name);
      localStorage.setItem('email', responseData.email);
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('role', responseData.role);
      localStorage.setItem('username', responseData.username)
      this.emitChange();
    }
    return response;
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
