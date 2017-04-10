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

  goToEvent(eventId) {
    browserHistory.push('/events/'+eventId);
  }

  render() {
    let events = this.state.events.map(event => {
      return <div key={event.id} onClick={() => this.goToEvent(event.id)} style={{ padding: '10px 5px', fontSize: '1.2em', border: '1px solid #ebebeb', cursor: 'pointer'}}>
        <strong>{event.name}</strong> - {event.place.name}
      </div>
    });
    return (
      <div>
        <Navbar />
        <h2>Events:</h2>
        <div style={{ marginBottom: '10px'}}>
          {events}
        </div>
        <div className="container-fluid">
          <div className="row">
            <Link to="/events/new" className="btn btn-success col-md-1">Add</Link>
          </div>
        </div>
			</div>
    );
  }
}
