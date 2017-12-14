import React from 'react';
import { Route } from 'react-router-dom';

import Menu from '../Menu';
import Header from '../Header';
import Footer from '../Footer';

const LayoutApp = ({ history, routes }) => (
  <div>
    <Header />
    <Menu history={history} />
    {routes.map((route, i) => (
      <Route
        exact
        key={i}
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    ))}
    <Footer />
  </div>
);

export default LayoutApp;
