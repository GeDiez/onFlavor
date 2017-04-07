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
    // this._updateOrdersFromStoreByEventId = this._updateOrdersFromStoreByEventId.bind(this);
  }

  // componentWillMount() {
  //   this._updateOrdersFromStoreByEventId();
  // }

  // _updateOrdersFromStoreByEventId() {
  //   OrdersStore.fetchOrdersByEventId(this.state.eventid, (orders) => {
  //     this.setState({
  //       orders: orders,
  //     });
  //   });
  // }

  async fetchEvent() {
    const { id } = this.props.params;
    const event = await EventsStore.getEventById(id);
    console.log(event);
    this.setState({ event });
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
    let isEnabled = true//this.state.dishName.length > 0 && this.state.dishPrice.length > 0;
    let orders = this.state.orders.map(order => {
      return <div key={order.id}>
        <span>{order.quantity} - </span>
        <span>{order.dish.name} - </span>
        <span>{order.dish.price} - </span>
        <span>{order.user.full_name}</span>
      </div>
    })
    return <div>
      <Navbar />
      <h2>Orders:</h2>
      {orders}

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
                  <div className="row">
                    <div className="col-md-8">
                      <h3>Dish:</h3>
                    </div>
                    <div className="col-md-8">
                      <span>Quesadillas (con queso)</span>
                    </div>
                    <div className="col-md-2">
                      <span>botton</span>
                    </div>
                    <div className="col-md-8">
                      <span>Tacos tuxpeños</span>
                    </div>
                    <div className="col-md-2">
                      <span>botton</span>
                    </div>
                    <div className="col-md-8">
                      <span>Torta milanesa</span>
                    </div>
                    <div className="col-md-2">
                      <span>botton</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6 col-md-offset-4">
                      <h3>Quantity:</h3>
                    </div>
                    <div className="col-md-6 col-md-offset-4">
                      <span>1</span>
                    </div>
                    <div className="col-md-6 col-md-offset-4">
                      <span>2</span>
                    </div>
                    <div className="col-md-6 col-md-offset-4">
                      <span>1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this._hideModal}>
              Close
            </button>
            <button className='btn btn-primary' disabled={!isEnabled}>
              Save dish
            </button>
          </ModalFooter>
        </Modal>
      </div>
      {/* ---------------- */}

    </div>
  }
}
