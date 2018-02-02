import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import Images from '@assets/images';

const Header = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <div className="row">
          <Link to="/" className="col-sm-2">
            <img alt="Brand" src={Images.micheladaBlueOne} width="100%" />
          </Link>
          <div className="col-sm-6 titleHeader">On Flavor </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
