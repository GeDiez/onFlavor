import React from 'react';
import { browserHistory, Link } from 'react-router';
import OrdersStore from '../../stores/OrdersStore';
import EventsStore from '../../stores/EventsStore';
import Navbar from '../Navbar';
import OrderItem from './OrderItem';
import moment from 'moment';
import io from 'socket.io-client'
const socket = io(window.location.origin);

import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

export default class ShowEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: this.props.params.id, // this is no ok, if it is in the props let it be in the props
      orders: [],
      event: null
    };
    this.addToOrder = this.addToOrder.bind(this);
    this.subtractToOrder = this.subtractToOrder.bind(this);
    this._saveButton = this._saveButton.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.fetchEvent = this.fetchEvent.bind(this);
    this.changeDetails = this.changeDetails.bind(this);
  }

  componentDidMount() {
    this.fetchEvent();
    socket.on('orders:new', order => {
      if (Number(this.state.eventid) == order.event_id) {
        let oldOrder = this.state.event.orders.find(ord => ord.id == order.id);
        if (!oldOrder) {
          let event = this.state.event;
          event.orders = [...this.state.event.orders, order];
          this.setState({
            event: event
          });
        }
      }
    });
    socket.on('orders:delete', order => {
      let event = this.state.event;
      event.orders = this.state.event.orders.filter(ord => ord.id != order.id);
      this.setState({
        event: event
      });
    });
  }

  async fetchEvent() {
    const { id } = this.props.params;
    const event = await EventsStore.getEventById(id);
    const orders = event.place && event.place.dishes ? event.place.dishes.map((dish) => (
      {
        dish,
        quantity: 0,
        details: ''
      }
    )) : [];
    this.setState({ event, orders });
  }

  addToOrder(dishId) {
    return () => {
      const { orders } = this.state;
      const newOrders = orders.map((order) => {
        if (order.dish.id === dishId) {
          return {...order, quantity: order.quantity + 1};
        }
        return order;
      });
      this.setState({
        orders: newOrders
      });
    }
  }

  subtractToOrder(dishId) {
    return () => {
      const { orders } = this.state;
      const newOrders = orders.map((order) => {
        if (order.dish.id === dishId) {
          return {...order, quantity: order.quantity < 1 ? 0 : order.quantity - 1};
        }
        return order;
      });
      this.setState({
        orders: newOrders
      });
    }
  }

  changeDetails(dishId, details) {
    const { orders } = this.state;
    const newOrders = orders.map((order) => {
      if (order.dish.id === dishId) {
        return {...order, details: details };
      }
      return order;
    });
    this.setState({
      orders: newOrders
    });
  }

  _saveButton() {
    let newOrder = this.state.orders.filter(order => order.quantity > 0).map(order => {
      OrdersStore.saveOrder({
        event_id: this.props.params.id,
        dish_id: order.dish.id,
        details: order.details,
        quantity: order.quantity,
      }, (message) => {
        // this.fetchEvent();
        this._hideModal();
      })
    });
  }

  _openModal = () => {
    this.setState({
      isOpen: true
    });
  }

  _hideModal = () => {
    this.setState({
      isOpen: false
    });
  }

  removeOrder(orderId)  {
    OrdersStore.removeOrder(orderId).then(data => {
      let event = this.state.event;
      event.orders = this.state.event.orders.filter(order => order.id != orderId);
      this.setState({
        event: event
      });
    });
  }

  render() {
    const { event, orders: newOrders } = this.state;
    const isEnabled = true//this.state.dishName.length > 0 && this.state.dishPrice.length > 0;
    const orders = event ? event.orders : [];
    const username = localStorage.getItem('username');
    const ordersComp = orders.map(order => {
      return <tr key={order.id}>
        <td>{order.dish.name}</td>
        <td>{order.quantity}</td>
        <td className="printer-hide">${order.dish.price}</td>
        <td>{order.details}</td>
        <td>{order.user.full_name}</td>
        <td className="text-center printer-hide">
        { order.user.username == username &&
          <a className="pointer" onClick={ () => this.removeOrder(order.id)}>Remove</a>
        }
        </td>
      </tr>
    });

    const menu = newOrders.map(({dish, quantity}) => (
      <OrderItem
        key={dish.id}
        dish={dish}
        quantity={quantity}
        subtractToOrder={this.subtractToOrder}
        addToOrder={this.addToOrder}
        changeDetails={this.changeDetails}
        />
    ));

    return <div>
      <Navbar />
      <div className="container-fluid">
        <div className="place-image" style={{ backgroundImage: 'url(http://videisimo.net/sites/default/files/comida-mexicana-17.jpg)'}}>
          <div className="info">
            <div className="row">
              <div className="col-sm-12">
                <h2>{event && event.name}{event && event.place && ` - ${event.place.name}`}</h2>
                <h4><i className="fa fa-file-text-o"></i> {event && event.description}</h4>
                <span><i className="fa fa-clock-o"></i> {event && moment(event.date_time).format('LLLL')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <br />
            <h4><i className="fa fa-cutlery"></i> Orders:</h4>
          </div>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Quantity</th>
              <th className="printer-hide">Price</th>
              <th>Details</th>
              <th>User</th>
              <th className="printer-hide"></th>
            </tr>
          </thead>
          <tbody>
            {ordersComp}
          </tbody>
        </table>

        <div className="form-group">
          <button type="button" className="btn btn-success col-md-2" onClick={this._openModal}>Add order</button>
        </div>
      </div>
      
      <Modal isOpen={this.state.isOpen} onRequestHide={this._hideModal}>
        <ModalHeader>
          <ModalClose onClick={this._hideModal}/>
          <ModalTitle>Menu</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <h3>Menu</h3>
              </div>
              <div className="col-md-3 col-md-offset-2">
                <h3>Quantity</h3>
              </div>
            </div>
            <div className="row">
              {menu}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-default' onClick={this._hideModal}>
            Close
          </button>
          <button className='btn btn-primary' disabled={!isEnabled} onClick={this._saveButton}>
            Add Order
          </button>
        </ModalFooter>
      </Modal>

    </div>
  }
}
