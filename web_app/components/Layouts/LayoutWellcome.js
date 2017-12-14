import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

const LayoutWellcome = ({ routes }) => (
  <div>
    <Header />
    <div className="content-layout">
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          render={props => <route.component {...props} routes={route.routes} />}
        />
      ))}
    </div>
    <Footer />
  </div>
);

export default LayoutWellcome;
