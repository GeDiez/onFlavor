import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

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
      events: [],
      places: [],
      place: { dishes: [] },
      alert: {
        visible: false,
        type: '',
        msg: '',
      },
    };
  }

  componentDidMount() {
    this.loadEvents();
    this.loadPlaces();
  }

  loadEvents = async () => {
    const events = await eventsRepository().get();
    this.setState({ events });
  };

  loadPlaces = async () => {
    const places = await placesRepository().getAll();
    this.setState({ places });
  };

  loadPlace = async idPlace => {
    const place = await placesRepository().getById(idPlace);
    this.setState({ place });
  };

  createOrder = userId => eventId => async dishes => {
    const response = await eventsRepository().createOrder(
      userId,
      eventId,
      dishes,
    );
    if (response.status === 201)
      return this.notify('success', 'se ha creado la orden');
    if (response.status === 200)
      this.notify('success', 'se ha creado la orden exitosamente');
  };

  createEvent = userId => async (_event, file) => {
    const event = await eventsRepository().create(userId, _event);
    if (event.errors) return this.notify('danger', 'Error: ' + event.errors);
    if (file) await eventsRepository().uploadImage(event.id, file);
    this.notify('success', 'Se ha creado un nuevo evento ');
    this.toggleModal('isAddEventModal')();
    this.loadEvents();
  };

  uploadImage = (eventId, file) => {
    eventsRepository().uploadImage(eventId, file);
  };

  getOrderOfUser = async eventId => {
    const order = await eventsRepository().getOrdersOfUser(
      eventId,
      this.props.user.id,
    );
    if (order.errors) return false;
    return order;
  };

  removeOrder = eventId => async orderId => {
    const result = await eventsRepository().removeOrder(
      this.props.user.id,
      eventId,
      orderId,
    );
    if (result.errors)
      return this.notify('danger', 'no se pudo eliminar la orden');
    this.notify('success', 'se ha eliminado la orden exitosamente');
  };

  //open modal
  toggleModal = variable => () => {
    this.setState(state => ({ [variable]: !state[variable] }));
  };

  closeNotifier = () => {
    this.setState(state => ({
      alert: { type: '', msg: '', visible: !state.alert.visible },
    }));
  };

  notify = (type, msg) => {
    this.setState(state => ({
      alert: {
        visible: !state.alert.visible,
        type,
        msg,
      },
    }));
  };

  showAllEvents = () => {
    return this.state.events.map(event => (
      <div className="col-sm-6 col-md-6 col-lg-3">
        <EventCard
          key={event.idEvent}
          event={event}
          loadPlace={this.loadPlace}
          place={this.state.place}
          getOrderOfUser={this.getOrderOfUser}
          removeOrder={this.removeOrder}
          createOrder={this.createOrder(this.props.user.id)}
        />
      </div>
    ));
  };

  render() {
    const { isAddEventModal, places } = this.state;
    return (
      <Fragment>
        <Alert
          color={this.state.alert.type}
          isOpen={this.state.alert.visible}
          toggle={this.closeNotifier}
        >
          {this.state.alert.msg}
        </Alert>
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
        <ButtonRound onClick={this.toggleModal('isAddEventModal')} />
        <AddEvent
          isOpen={isAddEventModal}
          closeModal={this.toggleModal('isAddEventModal')}
          places={places}
          createEvent={this.createEvent(this.props.user.id)}
          uploadImage={this.uploadImage}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps)(Events);
