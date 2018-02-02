import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';

import './index.css';

class Menu extends Component {
  render() {
    const itemMenuSelected = this.props.history.location.pathname;
    return (
      <ButtonGroup className="menu">
        <Link
          to="/onflavor/events"
          className={`item-menu text-color ${itemMenuSelected ===
            '/onflavor/events' && 'item-pressed'} btn btn-default`}
        >
          Events
        </Link>
        <Link
          to="/onflavor/places"
          className={`item-menu text-color ${itemMenuSelected ===
            '/onflavor/places' && 'item-pressed'} btn btn-default`}
        >
          Places
        </Link>
        <Link
          to="/onflavor/myEvents"
          className={`item-menu text-color ${itemMenuSelected ===
            '/onflavor/myEvents' && 'item-pressed'} btn btn-default`}
        >
          My Events
        </Link>
      </ButtonGroup>
    );
  }
}

export default Menu;
