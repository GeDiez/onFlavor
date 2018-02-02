import React from 'react';
import { Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Menu from '../Menu';
import Header from '../Header';
import UserMenu from '../UserMenu';
import Footer from '../Footer';

const LayoutApp = ({ history, routes }) => (
  <div>
    <Header />
    <Row>
      <Col sm="10">
        <Menu history={history} />
      </Col>
      <Col sm="2">
        <UserMenu />
      </Col>
    </Row>
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
