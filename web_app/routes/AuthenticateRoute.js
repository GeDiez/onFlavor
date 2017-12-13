import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({
  isAuthenticate,
  PrivateComponent: Component,
  path,
  routes,
}) => (
  <Route
    path={path}
    render={props =>
      isAuthenticate ? (
        <Component {...props} routes={routes} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

export default AuthenticatedRoute;
