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
          to="/"
          className={`item-menu text-color ${itemMenuSelected === '/' &&
            'item-pressed'} btn btn-default`}
        >
          Events
        </Link>
        <Link
          to="/places"
          className={`item-menu text-color ${itemMenuSelected === '/places' &&
            'item-pressed'} btn btn-default`}
        >
          Places
        </Link>
        <Link
          to="/myEvents"
          className={`item-menu text-color ${itemMenuSelected === '/myEvents' &&
            'item-pressed'} btn btn-default`}
        >
          My Events
        </Link>
      </ButtonGroup>
    );
  }
}

export default Menu;
