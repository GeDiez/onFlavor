import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

const LayoutWellcome = ({ routes }) =>
  routes.map((route, i) => (
    <Route
      exact
      key={i}
      path={route.path}
      render={props => (
        <div>
          <Header />
          <div className="content-layout">
            <route.component {...props} routes={route.routes} />
          </div>
          <Footer />
        </div>
      )}
    />
  ));

export default LayoutWellcome;
