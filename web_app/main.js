'use strict';

import ReactDOM from 'react-dom';
import React from 'react';

import WellcomeContainer from './components/wellcome';
import PlacesContainer from './components/places';
import EditPlaces from './components/places/edit';
import ShowPlaces from './components/places/show';
import ShowEvents from './components/events/show';
import Login from './components/Login';
import Events from './components/Events';
import Orders from './components/Orders';
import AddEvents from './components/Events/add';


import App from './App';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

function requireAuth (nextState, replace, callback) {
  const token = localStorage.getItem('token')
  if (!token) replace('/login')
  return callback()
}

ReactDOM.render((<Router history={browserHistory}>

<Route path="/" component={App}>
  <IndexRoute components={{content: WellcomeContainer}} onEnter={requireAuth}/>
  <Route path="/wellcome" components={{content: WellcomeContainer}} onEnter={requireAuth} />
  <Route path="/login" components={{content: Login}} />
  <Route path="/events" components={{content: Events}} onEnter={requireAuth} />
  <Route path="/orders" components={{content: Orders}} onEnter={requireAuth} />
  <Route path="/events/new" components={{content: AddEvents}} onEnter={requireAuth} />
  <Route path="/places" components={{content: PlacesContainer}} onEnter={requireAuth} />
  <Route path="/places/new" components={{content: EditPlaces}} onEnter={requireAuth} />
  <Route path="/places/:id" components={{content: ShowPlaces}} onEnter={requireAuth} />
  <Route path="/places/:id/edit" components={{content: EditPlaces}} onEnter={requireAuth} />
  <Route path="/events/:id" components={{content: ShowEvents}} onEnter={requireAuth} />
</Route>
</Router>), document.getElementById('content'));
