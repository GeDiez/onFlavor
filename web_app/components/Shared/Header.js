import React from 'react';
import { BrowserHistory, Link } from 'react-router-dom';
import Images from '../../../public/images';

const Header = () => (
  <nav className="navbar navbar-default" style={{background: '#121223'}}>
    <div className="container-fluid">
      <div className="navbar-header">
        <div className='row'>
          <Link to='/' className='col-sm-3'>
            <img alt="Brand" src={Images.logoMicheladaIo} width='100%'/>
          </Link>
          <div className='col-sm-6' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '28px 0', fontSize: '2em', color: 'white'}}>
            On Flavor app
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
