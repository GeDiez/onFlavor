import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticateRoute from './AuthenticateRoute';
import LayoutApp from '../components/Layouts/LayoutApp';
import LayoutWellcome from '../components/Layouts/LayoutWellcome';
import Events from '../components/Events';
import Places from '../components/Places';
import MyEvents from '../components/Events/MyEvents';
import Signin from '../components/Wellcome/Signin';
import Signup from '../components/Wellcome/Signup';

const publicRoutes = [
  {
    path: '/',
    component: Signin,
  },
  {
    path: '/signup',
    component: Signup,
  },
];

const privatesRoutes = [
  {
    path: '/onflavor/events',
    component: Events,
  },
  {
    path: '/onflavor/places',
    component: Places,
  },
  {
    path: '/onflavor/myevents',
    component: MyEvents,
  },
];

const Routes = ({ session: { isAuthenticate } }) => (
  <div>
    {/* <Route
      exact
      path="/"
      render={props =>
        props.match.path === '/' ? <Redirect to="/signin" /> : null
      }
    /> */}
    <Route
      path="/"
      render={props => <LayoutWellcome {...props} routes={publicRoutes} />}
    />
    <AuthenticateRoute
      isAuthenticate={isAuthenticate}
      PrivateComponent={LayoutApp}
      path="/onflavor"
      routes={privatesRoutes}
    />
  </div>
);

const mapStateToProps = state => ({
  session: state.session,
});

export default connect(mapStateToProps)(Routes);
