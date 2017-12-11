import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

  render() {
    console.log(this.props.history)
    const itemMenuSelected = this.props.history.location.pathname;
    console.log(itemMenuSelected);
    return (
      <div className={"btn-group btn-group-lg menu"} role="group" aria-label="Large button group">
        <Link to='/onflavor/events' className={`letters ${itemMenuSelected == '/onflavor/events' && 'buttonPressed' } btn btn-default`} >Events</Link>
        <Link to='/onflavor/places' className={`letters ${itemMenuSelected == '/onflavor/places' && 'buttonPressed' } btn btn-default`} >Places</Link>
        <Link to='/onflavor/myEvents' className={`letters ${itemMenuSelected == '/onflavor/myEvents' && 'buttonPressed' } btn btn-default`} >My Events</Link>
      </div>
    );
  }
}

export default Menu;
