import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticateRoute from './AuthenticateRoute';
import LayoutApp from '../components/Shared/LayoutApp';
import Events from '../components/Events';
import Places from '../components/Places';
// import MyEvents from '../components/MyEvents';
import Signin from '../components/Wellcome/Signin';
import Signup from "../components/Wellcome/Signup";

const privatesRoutes = [
  {
    path: '/onflavor/events',
    component: Events
  },
  {
    path: '/onflavor/places',
    component: Places
  },
  {
    path: '/onflavor/myevents',
    component: Places
  }
];

const Routes = ({ session: { isAuthenticate } }) => (
  <div>
    <Route exact path='/' component={Signin} />
    <Route path='/signin' component={Signin} />
    <Route path='/signup' component={Signup} />
    <AuthenticateRoute isAuthenticate={isAuthenticate} PrivateComponent={LayoutApp} path='/onflavor' routes={privatesRoutes}/>
  </div>
);

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps)(Routes);
