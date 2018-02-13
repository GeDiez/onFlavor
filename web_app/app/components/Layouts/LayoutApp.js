import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Menu from '../Menu';
import Header from '../Header';
import UserMenu from '../UserMenu';
import Footer from '../Footer';

import Background from '@assets/images/foamichelada_red_one_up.png';

const LayoutApp = ({ history, routes }) => (
  <Fragment>
    <Header />
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundColor: '#DCDCDC',
        backgroundSize: '200px',
        backgroundRepeat: 'no-repeat',
        height: '100%',
      }}
    >
      <Row>
        <Col
          sm={{ size: 8, offset: 2 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Menu history={history} />
        </Col>
        <Col sm="2">
          <UserMenu />
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          {routes.map((route, i) => (
            <Route
              exact
              key={i}
              path={route.path}
              render={props => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          ))}
        </Col>
      </Row>
    </div>
    {/* <Footer /> */}
  </Fragment>
);

export default LayoutApp;
