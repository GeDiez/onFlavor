import React from 'react';
import { Route } from 'react-router-dom';

import Menu from './Menu';
import Header from './Header';

const LayoutApp = ({ history, routes }) => (
  <div>
    <Header />
    <Menu history={history} />
    {routes.map((route, i) => (
      <Route
        key={i}
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    ))}
  </div>
);

export default LayoutApp;
