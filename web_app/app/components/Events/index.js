import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import EventCard from './EventCard';
import AddEvent from './AddEvent';
import ButtonRound from '../Shared/ButtonRound';

import eventsRepository from '../../repository/events';
import placesRepository from '../../repository/places';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      isAddEventModal: false,
      isConfirmJoinModal: false,
      events: [],
      places: [],
      place: { dishes: [] },
    };
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = async () => {
    const events = await eventsRepository().get();
    this.setState({ events });
  };

  loadPlaces = async () => {
    const places = await placesRepository().get();
    this.setState({ places });
  };

  loadPlace = async idPlace => {
    const place = await placesRepository().getById(idPlace);
    this.setState({ place });
  };

  toggleAddEventModal = async () => {
    await this.loadPlaces();
    this.setState(state => ({ isAddEventModal: !state.isAddEventModal }));
  };

  showAllEvents = () =>
    this.state.events.map(event => (
      <div className="col-sm-6 col-md-6 col-lg-3">
        <EventCard
          key={event.idEvent}
          event={event}
          onClickCard={this.toggleConfirmJoinModal}
          loadPlace={this.loadPlace}
          place={this.state.place}
        />
      </div>
    ));

  render() {
    const { isAddEventModal } = this.state;
    const { places } = this.state;
    return (
      <Fragment>
        <div
          className="row"
          style={{
            marginTop: '4em',
            borderWidth: '1px',
            borderColor: 'red',
            overflowY: 'auto',
          }}
        >
          {this.showAllEvents()}
        </div>
        <ButtonRound onClick={this.toggleAddEventModal} />
        <AddEvent
          isOpen={isAddEventModal}
          closeModal={this.toggleAddEventModal}
          addEvent={this.addEvent}
          places={places}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  places: state.places.places,
});

export default connect(mapStateToProps)(Events);
