import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import LoginStore from '../../stores/LoginStore';
import EventsStore from '../../stores/EventsStore';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this._updateEventFromStore();
  }

  async _updateEventFromStore() {
    const events = await EventsStore.fetchEvents();
    this.setState({
      events: events
    });
  }

  render() {
    let events = this.state.events.map(event => {
      return <div key={event.id} style={{ padding: '10px 0', fontSize: '1.2em'}}>
        <Link to={'/events/'+event.id } className="">
          {event.name} - {event.place.name}
        </Link>
      </div>
    });
    return (
      <div>
        <Navbar />
        <h2>Events:</h2>
        {events}
        <div className="container-fluid">
          <div className="row">
            <Link to="/events/new" className="btn btn-success col-md-1">Add</Link>
          </div>
        </div>
			</div>
    );
  }
}
