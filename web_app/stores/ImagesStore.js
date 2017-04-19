import { EventEmitter } from 'events';
import request from 'superagent';

const CHANGE_EVENT = 'change';
let ajaxRequests = [];

const ImagesStore = Object.assign({}, EventEmitter.prototype, {
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

  uploadImage(fileName, fileType, file) {
    return new Promise(async (res, rej) => {
      const { signedRequest, url } = await this.getSignedUrl(fileName, fileType);

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log(url);
            console.log('yay!');
            res(url);
          }
          else{
            rej('Could not upload file.');
          }
        }
      };
      xhr.send(file);

    })
  },

  async getSignedUrl(fileName, fileType) {
    const response = await fetch('/sign-s3', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'file-name': fileName,
        'file-type': fileType
      })
    });
    const responseData = await response.json();
    return responseData;
    ajaxRequests.push(response);

  }

});

export default ImagesStore;
