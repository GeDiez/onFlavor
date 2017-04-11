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
          <Link className="navbar-brand" to="/">On Flavor</Link>
        </div>
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
    </nav>
  </div>
);

export default Navbar;
