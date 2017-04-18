import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import LoginStore from '../../stores/LoginStore';
import EventsStore from '../../stores/EventsStore';
import moment from 'moment';

export default class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this._updateEventFromStore();
  }

  async _updateEventFromStore() {
    const events = await EventsStore.fetchMyEvents();
    this.setState({
      events: events
    });
  }

  goToEvent(eventId) {
    browserHistory.push('/events/'+eventId);
  }

  removeEvent(eventId) {
    EventsStore.deleteEventById(eventId).then(data => {
      if (!data.error) {
        this.setState({
          events: this.state.events.filter(e => e.id != eventId)
        });
      }
    });
  }

  removeAlert(eventId) {
    let remove = confirm('Do you want to remove this event?');
    if (remove == true) {
      this.removeEvent(eventId);
    }
  }

  render() {
    let events = this.state.events.map(event => {
      return <div key={event.id} className="event-card row">
        <div className="col-lg-1 col-sm-2">
          <div className="tumbnail" style={{ backgroundImage: 'url(http://videisimo.net/sites/default/files/comida-mexicana-17.jpg)'}} onClick={()=>this.goToEvent(event.id)}></div>
        </div>
        <div className="col-lg-10 col-sm-8">
          <span className="name">{event.name}</span>
          <span className="place"><i className="fa fa-cutlery"></i> {event.place.name}</span>
          <span className="date-time pull-right"><i className="fa fa-clock-o"></i> {moment(event.date_time).format('lll')}</span>
        </div>
        <div className="col-lg-1 col-sm-2 text-center">
          <button className="btn btn-danger" onClick={()=>this.removeAlert(event.id)}>
            Remove <i className="fa fa-trash"></i>
          </button>
          <Link className="btn btn-primary" to={'/events/'+event.id+'/edit'}>
            Edit <i className="fa fa-pencil"></i>
          </Link>
        </div>
      </div>
    });
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2>My Events</h2>
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
