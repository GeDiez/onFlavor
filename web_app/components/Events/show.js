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
      console.log(orders);
      this.setState({
        orders: orders, 
      });
    });
  }

  render() {
    /*let orders = this.state.orders.map(order => {
      return <div key={order.id}> 
        <span>hola</span> 
      </div>
    });*/

    return <div> 
      <Navbar />
      <span>Hello</span>
    </div>
  }
}