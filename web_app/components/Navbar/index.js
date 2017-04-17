import React from 'react';
import { browserHistory, Link } from 'react-router';

import LoginStore from '../../stores/LoginStore';

const logout = () => {
  LoginStore.logout();
  browserHistory.push('/login');
}
const Navbar = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">On Flavor</Link>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/places">Places</Link></li>
            <li className="dropdown">
              <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Events
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dLabel">
                <li>
                  <Link to="/events">List</Link>
                </li>
                <li>
                  <Link to="/myevents">My events</Link>
                </li>
                <li>
                  <Link to="/events/new">Create event</Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="pointer">
              <Link onClick={logout}>
                <span className="glyphicon glyphicon-log-in"></span> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
