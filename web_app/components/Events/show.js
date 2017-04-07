import React from 'react';
import { browserHistory, Link } from 'react-router';
import OrdersStore from '../../stores/OrdersStore';
import Navbar from '../Navbar';

export default class ShowEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: this.props.params.id,
      orders: [],
    };
    this._updateOrdersFromStoreByEventId = this._updateOrdersFromStoreByEventId.bind(this);
  }

  componentWillMount() {
    this._updateOrdersFromStoreByEventId();
  }

  _updateOrdersFromStoreByEventId() {
    OrdersStore.fetchOrdersByEventId(this.state.eventid, (orders) => {
      this.setState({
        orders: orders, 
      });
    });
  }

  render() {
    return <div> 
      <Navbar />
      <span>Hello</span>
    </div>
  }
}
