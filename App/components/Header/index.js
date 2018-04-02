import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import logo from '@assets/images/michelada_white_one.png';

const Header = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <div className="row">
          <Link to="/" className="col-sm-2">
            <img alt="Brand" src={logo} width="100%" />
          </Link>
          <div className="col-sm-8 titleHeader">On Flavor</div>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
