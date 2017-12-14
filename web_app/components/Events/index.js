import React from 'react';
import { connect } from 'react-redux';

import EventCard from './EventCard';
import AddEvent from './AddEvent';
import ConfirmJoin from './ConfirmJoin';
import ButtonRound from '../Shared/ButtonRound';

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddEventModal: false,
      isConfirmJoinModal: false,
    };
  }

  addEvent = () => {
    //an action add event
  };

  joinmeEvent = () => {
    //some action
  };

  showAllEvents = () =>
    this.props.events.map(event => (
      <div className="col-sm-6 col-md-6 col-lg-4">
        <EventCard
          key={event.idEvent}
          event={event}
          onClickCard={this.toggleConfirmJoinModal}
        />
      </div>
    ));

  toggleConfirmJoinModal = () => {
    this.setState(state => ({ isConfirmJoinModal: !state.isConfirmJoinModal }));
  };
  toggleAddEventModal = () =>
    this.setState(state => ({ isAddEventModal: !state.isAddEventModal }));

  render() {
    const { isAddEventModal, isConfirmJoinModal } = this.state;
    const { places } = this.props;
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '4em' }}>
          {this.showAllEvents()}
          <ButtonRound onClick={this.toggleAddEventModal} />
        </div>
        <AddEvent
          isOpen={isAddEventModal}
          closeModal={this.toggleAddEventModal}
          addEvent={this.addEvent}
          places={places}
        />
        <ConfirmJoin
          isOpen={isConfirmJoinModal}
          onClickCancel={this.toggleConfirmJoinModal}
          onClickJoinme={this.joinmeEvent}
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
