import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import configureStore from './reducks/store';
import Routes from './routes';

const Store = configureStore();
const RoutesContainer = withRouter(Routes);

const OnFlavor = () => (
  <Provider store={Store}>
    <Router>
      <RoutesContainer />
    </Router>
  </Provider>
);

ReactDOM.render(<OnFlavor />, document.getElementById('content'));
