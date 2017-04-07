import React from 'react';
import { browserHistory, Link } from 'react-router';
import OrdersStore from '../../stores/OrdersStore';
import EventsStore from '../../stores/EventsStore';
import Navbar from '../Navbar';

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

  render() {
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
    </div>
  }
}
