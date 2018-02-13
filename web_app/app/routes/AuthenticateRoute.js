import React from 'react';
import { Route } from 'react-router-dom';

const AuthenticatedRoute = ({
  isAuthenticate,
  PrivateComponent: Component,
  path,
  routes,
}) => (
  <Route
    path={path}
    render={props => {
      if (isAuthenticate) return <Component {...props} routes={routes} />;
    }}
  />
);

export default AuthenticatedRoute;
