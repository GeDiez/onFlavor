const gapiPromised = () => {
  return new Promise(function(resolve, reject) {
    gapi.load('client', resolve);
  });
};

const init = async () => {
  await gapiPromised();
  await gapi.client.init({
    clientId:
      '131833217819-0oao54so79c56r86mkb80059qrd52qjh.apps.googleusercontent.com',
    scope: 'profile',
  });
};

export default { init };
