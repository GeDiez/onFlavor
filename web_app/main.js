'use strict';

// router file
import ReactDOM from 'react-dom';
import React from 'react';

import WellcomeContainer from './components/wellcome';
import PlacesContainer from './components/Places';
import EditPlaces from './components/Places/edit';
import ShowPlaces from './components/Places/show';
import ShowEvents from './components/Events/show';
import Login from './components/Login';
import Events from './components/Events';
import MyEvents from './components/Events/myevents';
import Orders from './components/Orders';
import AddEvents from './components/Events/add';


import App from './App';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

function requireAuth (nextState, replace, callback) {
  const token = localStorage.getItem('token')
  if (!token || token == 'undefined') {
    browserHistory.push(`/login`);
    //replace('/login');
  } else {
    return callback()
  }
}

ReactDOM.render((<Router history={browserHistory}>

<Route path="/" component={App}>
  <IndexRoute components={{content: Events}} onEnter={requireAuth}/>
  <Route path="/wellcome" components={{content: WellcomeContainer}} onEnter={requireAuth} />
  <Route path="/login" components={{content: Login}} />
  <Route path="/events" components={{content: Events}} onEnter={requireAuth} />
  <Route path="/myevents" components={{content: MyEvents}} onEnter={requireAuth} />
  <Route path="/orders" components={{content: Orders}} onEnter={requireAuth} />
  <Route path="/places" components={{content: PlacesContainer}} onEnter={requireAuth} />
  <Route path="/places/new" components={{content: EditPlaces}} onEnter={requireAuth} />
  <Route path="/places/:id" components={{content: ShowPlaces}} onEnter={requireAuth} />
  <Route path="/places/:id/edit" components={{content: EditPlaces}} onEnter={requireAuth} />
  <Route path="/events/new" components={{content: AddEvents}} onEnter={requireAuth} />
  <Route path="/events/:id" components={{content: ShowEvents}} onEnter={requireAuth} />
  <Route path="/events/:id/edit" components={{content: AddEvents}} onEnter={requireAuth} />
</Route>
</Router>), document.getElementById('content'));
