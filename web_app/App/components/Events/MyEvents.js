import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Alert } from 'reactstrap';
import EventCardmini from './EventCardmini';
import eventsRepository from '../../repository/events';
import usersRepository from '../../repository/user';

class MyEvents extends Component {
  state = {
    events: [],
    alert: {
      visible: false,
      type: '',
      msg: '',
    },
    modalAskForRemove: false,
  };

  componentDidMount() {
    this.loadMyEvents();
  }

  loadMyEvents = async () => {
    const events = await eventsRepository().getMyEvents(this.props.user.id);
    this.setState({ events });
  };

  getOrdersByEvent = async eventId => {
    const orders = await eventsRepository().getOrdersByEvent(eventId);
    if (!orders.errors) return orders;
    this.notify('danger', 'ocurrio un error al traer las ordenes');
  };

  removeEvent = eventId => async () => {
    await eventsRepository().remove(this.props.user.id, eventId);
    this.notify('success', 'Se ha eliminado un evento');
  };

  getAllUsers = async () => {
    const users = await usersRepository().getAll();
    if (users.errors) return [];
    return users;
  };

  addAdmin = eventId => async userAdmin => {
    const result = await eventsRepository().addAdmin(
      this.props.user.id,
      eventId,
      userAdmin,
    );
    if (!result.errors)
      return this.notify('success', 'Se ha agregado un admin un evento');
    this.notify('danger', 'ocurrio un error');
  };
  //function to show notifies about places
  notify = (type, msg) => {
    this.setState({
      alert: {
        visible: true,
        type,
        msg,
      },
    });
  };

  closeNotify = () => {
    this.setState({
      alert: {
        visible: false,
        type: '',
        msg: '',
      },
    });
  };

  renderEvents = () => {
    if (Array.isArray(this.state.events))
      return this.state.events.map(event => (
        <EventCardmini
          event={event}
          removeEvent={this.removeEvent}
          getOrdersByEvent={this.getOrdersByEvent}
          addAdmin={this.addAdmin}
          getAllUsers={this.getAllUsers}
        />
      ));
  };

  render() {
    return (
      <div className="container">
        <Alert
          color={this.state.alert.type}
          isOpen={this.state.alert.visible}
          toggle={this.closeNotify}
        >
          {this.state.alert.msg}
        </Alert>
        <h1>
          <small>All my events</small>
        </h1>
        <hr />
        <Row>{this.renderEvents()}</Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps)(MyEvents);
