import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './app/reducks/store';
import Routes from './app/routes';

const Store = configureStore();
const RoutesContainer = withRouter(Routes);

const OnFlavor = () => (
  <AppContainer>
    <Provider store={Store}>
      <Router>
        <RoutesContainer />
      </Router>
    </Provider>
  </AppContainer>
);

ReactDOM.render(<OnFlavor />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept(/*['./component.js'], () => {
    const NextComponent = require('./component.js').default;
    ReactDOM.render(<NextComponent />, document.getElementById('root'));
  }*/);
}
