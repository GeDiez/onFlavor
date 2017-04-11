import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import LoginStore from '../../stores/LoginStore';
import EventsStore from '../../stores/EventsStore';
import moment from 'moment';

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
      return <div key={event.id} onClick={() => this.goToEvent(event.id)} className="event-card">
        <span className="name">{event.name}</span>
        <span className="place"><i className="fa fa-cutlery"></i> {event.place.name}</span>
        <span className="date-time pull-right"><i className="fa fa-clock-o"></i> {moment(event.date_time).format('lll')}</span>
      </div>
    });
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2>Events</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div style={{ marginBottom: '10px', marginTop: '15px' }}>
                {events}
              </div>
            </div>
          </div>
        </div>
			</div>
    );
  }
}
