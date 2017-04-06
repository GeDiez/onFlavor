import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import EventsStore from '../../stores/EventsStore';

export default class Login extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <Link to="/events/new" className="btn btn-success col-md-1">Add</Link>
          </div>
        </div>
			</div>
    );
  }
}
