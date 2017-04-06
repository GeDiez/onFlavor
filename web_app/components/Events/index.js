import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import LoginStore from '../../stores/LoginStore';
import EventStore from '../../stores/EventStore';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentWillMount() {
    this._updateEventFromStore();
  }

  _updateEventFromStore(){
    EventStore.fetchEvents((events) =>{
      this.setState({events: events});
    });
  }

  render() {
    let events = this.state.events.map(event => {
      return <div key={event.id}> 
        <span> {event.name} - {event.place.name} </span>
      </div>
    });
    return (
      <div>
        <Navbar />
        Events:
        {events}
			</div>
    );
  }
}
