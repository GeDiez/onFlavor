import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App/index';
// import userRepository from './App/repository/user';

// gapi.load('client', () => {
//   gapi.client
//     .init({
//       clientId:
//         '131833217819-0oao54so79c56r86mkb80059qrd52qjh.apps.googleusercontent.com',
//       scope: 'profile',
//     })
//     .then(function() {
//       console.log('Gapi has loaded');
//       const token_info = userRepository().getCurrentUserToken();
//       if (token_info)
//         userRepository().authenticateOnFlavor({
//           idToken: token_info.idToken,
//           token: token_info.token,
//           provider: token_info.provider,
//         });
//     });
// });

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
