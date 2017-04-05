import React from 'react';
import { browserHistory, Link } from 'react-router';

import LoginStore from '../../stores/LoginStore';

const logout = () => {
  LoginStore.logout();
browserHistory.push('/login');
}
const Login = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">On Flavor</Link>
      </div>
      <ul className="nav navbar-nav">
        <li><Link to="/places">Places</Link></li>
        <li><Link to="/events">Events</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><Link onClick={logout}><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li>
      </ul>
    </div>
  </nav>
);

export default Login;
