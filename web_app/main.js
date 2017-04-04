'use strict';

import ReactDOM from 'react-dom';
import React from 'react';

import WellcomeContainer from './components/wellcome';
import PlacesContainer from './components/places';
import EditPlaces from './components/places/edit';
import ShowPlaces from './components/places/show';

import App from './App';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render((<Router history={browserHistory}>
<Route path="/" component={App}>
  <IndexRoute components={{content: WellcomeContainer}}/>
  <Route path="/wellcome" components={{content: WellcomeContainer}} />
  <Route path="/places" components={{content: PlacesContainer}} />
  <Route path="/places/new" components={{content: EditPlaces}} />
  <Route path="/places/:id" components={{content: ShowPlaces}} />
  <Route path="/places/:id/edit" components={{content: EditPlaces}} />
</Route>
</Router>), document.getElementById('content'));