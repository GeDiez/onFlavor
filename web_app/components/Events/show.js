import React from 'react';
import { browserHistory, Link } from 'react-router';
import OrdersStore from '../../stores/OrdersStore';
import EventsStore from '../../stores/EventsStore';
import Navbar from '../Navbar';

import {Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

export default class ShowEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: this.props.params.id, // this is no ok, if it is in the props let it be in the props
      orders: [],
      event: null
    };
    this.fetchEvent();
    this.addToOrder = this.addToOrder.bind(this);
    this.subtractToOrder = this.subtractToOrder.bind(this);
    this._saveButton = this._saveButton.bind(this);
  }

  async fetchEvent() {
    const { id } = this.props.params;
    const event = await EventsStore.getEventById(id);
    const orders = event.place.dishes.map((dish) => (
      {
        dish,
        quantity: 0
      }
    ))
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

  _saveButton() {

    let newOrder = this.state.orders.filter(order => order.quantity > 0).map(order => {
      OrdersStore.saveOrder({
        event_id: this.props.params.id,
        dish_id: order.dish.id,
        quantity: order.quantity,
      }, (message) => {
        this.fetchEvent();
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

  render() {
    const { event, orders: newOrders } = this.state;
    const isEnabled = true//this.state.dishName.length > 0 && this.state.dishPrice.length > 0;
    const orders = event ? event.orders : [];
    const ordersComp = orders.map(order => {
      return <div key={order.id}>
        <span>{order.quantity} - </span>
        <span>{order.dish.name} - </span>
        <span>{order.dish.price} - </span>
        <span>{order.user.full_name}</span>
      </div>
    });
    const menu = newOrders.map(({dish, quantity}) => (
      <div key={dish.id}>
        <div className="col-md-6">
          <span>{dish.name}</span>
        </div>
        <div className="col-md-3"> 
          <i className="fa fa-minus" aria-hidden="true" onClick={this.subtractToOrder(dish.id)} />
          {' '}
          <i className="fa fa-plus" aria-hidden="true" onClick={this.addToOrder(dish.id)} />
        </div>
        <div className="col-md-3">{quantity}</div>
      </div>
    ));
    return <div>
      <Navbar />
      <h2>{event && event.name}</h2>
      <h4>{event && event.description}</h4>
      <h2>Orders:</h2>
      {ordersComp}

      {/* Modal form */}
      <div className="form-group">
        <button type="button" className="btn btn-success col-md-2" onClick={this._openModal}>Add order</button>
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
              Save dish
            </button>
          </ModalFooter>
        </Modal>
      </div>
      {/* ---------------- */}

    </div>
  }
}