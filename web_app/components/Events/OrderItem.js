import React from 'react';
import { browserHistory, Link } from 'react-router';
import OrdersStore from '../../stores/OrdersStore';
import EventsStore from '../../stores/EventsStore';
import Navbar from '../Navbar';
import moment from 'moment';

import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

export default class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: '',
      showDetails: false
    };
    this.onDetailsChange = this.onDetailsChange.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  onDetailsChange(ev) {
    this.setState({
      details: ev.target.value
    },() => {
      this.props.changeDetails(this.props.dish.id, this.state.details);
    });
  }

  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    return (
      <div key={this.props.dish.id}>
        <div className="col-md-6 one-line">
          <span>{this.props.dish.name}</span>
        </div>
        <div className="col-md-3">
          <i className="fa fa-minus" aria-hidden="true" onClick={this.props.subtractToOrder(this.props.dish.id)} />
          {' '}
          <i className="fa fa-plus" aria-hidden="true" onClick={this.props.addToOrder(this.props.dish.id)} />
        </div>
        <div className="col-md-2">{this.props.quantity}</div>
        <div className="col-md-1 text-right">
          <i className="fa fa-file-text-o fa-lg pointer" onClick={this.toggleDetails}></i>
        </div>
        { this.state.showDetails && 
          <div className="col-sm-12">
            <label>Details</label>
            <textarea type="text" value={this.state.details} className="form-control" onChange={this.onDetailsChange}></textarea>
          </div>
        }
      </div>
    );
  }
}