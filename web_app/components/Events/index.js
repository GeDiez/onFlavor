import React from 'react';
import { connect } from 'react-redux';

import EventCard from './EventCard';
import AddEvent from './AddEvent';
import ButtonRound from '../Shared/ButtonRound';

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddEventModal: false,
    };
  }

  addEvent = () => {
    //hace algo
  };

  showAllEvents = () =>
    this.props.events.map(event => (
      <EventCard key={event.idEvent} event={event} />
    ));

  toogleAddEventModal = () =>
    this.setState(state => ({ isAddEventModal: !state.isAddEventModal }));

  render() {
    const { isAddEventModal } = this.state;
    const { places } = this.props;
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '4em' }}>
          {this.showAllEvents()}
          <ButtonRound onClick={this.toogleAddEventModal} />
        </div>
        <AddEvent
          isOpen={isAddEventModal}
          closeModal={this.toogleAddEventModal}
          addEvent={this.addEvent}
          places={places}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  places: state.places.places,
});

export default connect(mapStateToProps)(Events);
