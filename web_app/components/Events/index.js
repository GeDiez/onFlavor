import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import LoginStore from '../../stores/LoginStore';
import EventsStore from '../../stores/EventsStore';
import moment from 'moment';
import io from 'socket.io-client'
const socket = io(window.location.origin);

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this._updateEventFromStore();
  }

  componentDidMount() {
    socket.on('events:new', event => {
      let oldEvent = this.state.events.find(ev => ev.id == event.id);
      console.log(oldEvent);
      if (!oldEvent) {
        this.setState({
          events: [event, ...this.state.events]
        });
      }
    });
    socket.on('events:delete', event => {
      this.setState({
        events: this.state.events.filter(ev => ev.id != event.id)
      });
    });
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
      return <div key={event.id} onClick={() => this.goToEvent(event.id)} className="event-card row">
        <div className="col-lg-1 col-sm-2">
          <div className="tumbnail" style={{ backgroundImage: `url(${event.image_url ? event.image_url : event.place.image_url ? event.place.image_url : '/images/crockery.jpg'})`}}></div>
        </div>
        <div className="col-lg-11 col-sm-10">
          <span className="name">{event.name}</span>
          <span className="place"><i className="fa fa-cutlery"></i> {event.place.name}</span>
          <span className="date-time pull-right"><i className="fa fa-clock-o"></i> {moment(event.date_time).format('lll')}</span>
        </div>
      </div>
    });
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2>Events cahnge</h2>
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
