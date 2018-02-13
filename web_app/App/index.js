import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import Store from './reducks/store';
import Routes from './routes';

const RoutesContainer = withRouter(Routes);

const App = () => (
  <Provider store={Store}>
    <Router>
      <RoutesContainer />
    </Router>
  </Provider>
);

export default App;
