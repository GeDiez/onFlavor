'use strict';

import ReactDOM from 'react-dom';
import React from 'react';

import WellcomeContainer from './components/wellcome';

import App from './App';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render((<Router history={browserHistory}>
<Route path="/" component={App}>
  <IndexRoute components={{content: WellcomeContainer}}/>
  <Route path="/wellcome" components={{content: WellcomeContainer}} />
</Route>
</Router>), document.getElementById('content'));