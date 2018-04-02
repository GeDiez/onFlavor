import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Table,
} from 'reactstrap';

import './ConfirmJoin.css';

class ConfirmJoin extends Component {
  state = {
    order: [],
    currentDish: '',
    currentQuantity: '',
    currentDetails: '',
  };

  findDish = idDish => {
    return this.props.place.dishes.find(dish => dish.id === idDish);
  };

  onChangeDish = ev => {
    this.setState({ currentDish: ev.target.value });
  };

  onChangeQuantity = ev => {
    this.setState({ currentQuantity: ev.target.value });
  };

  onChangeDetails = ev => {
    this.setState({ currentDetails: ev.target.value });
  };

  onClickCheckDish = () => {
    const { currentDish } = this.state;
    if (!currentDish) return;
    const findInOrder = this.state.order.find(
      dish => dish.dish_id === currentDish,
    );
    if (findInOrder) return this.setState({ msj: 'dish was selected already' });
    this.setState(state => ({
      order: [
        ...state.order,
        {
          dish_id: state.currentDish,
          quantity: state.currentQuantity,
          details: state.currentDetails,
        },
      ],
    }));
  };

  removeDishFromOrder = dishId => {
    const order = this.state.order.filter(dish => dish.dish_id !== dishId);
    this.setState({ order });
  };

  totalOrder = () => {
    return this.state.order.reduce((vi, _dish) => {
      const dish = this.findDish(_dish.dish_id);
      return vi + dish.price * _dish.quantity;
    }, 0);
  };

  createOrder = () => {
    this.props.createOrder(this.state.order);
    this.setState({ order: [] });
    this.props.onClickCancel();
  };

  renderDishes = () => {
    return this.state.order.map((_dish, i) => {
      const dish = this.findDish(_dish.dish_id);
      return (
        <tr>
          <th scope="row">{i + 1}</th>
          <td>{_dish.quantity}</td>
          <td>{dish.name}</td>
          <td>{dish.price}</td>
          <td>{_dish.details || '-'}</td>
          <td>
            <span
              className="fa fa-close"
              style={{ color: 'red' }}
              onClick={() => this.removeDishFromOrder(_dish.dish_id)}
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    const { isOpen, onClickCancel, place } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={onClickCancel}>
        <ModalHeader
          style={{
            background: 'rgb(26, 35, 126)',
            color: 'white',
            justifyContent: 'center',
          }}
        >
          Do you want to join at Event?
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="exampleSelectMulti">Select your dishes</Label>
                <Input type="select" onChange={this.onChangeDish}>
                  <option value="">select a dish</option>
                  {place.dishes.map(dish => (
                    <option value={dish.id}>
                      {dish.name} {dish.price}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="4">
              <FormGroup>
                <Label for="exampleSelectMulti">Quantity</Label>
                <Input
                  type="text"
                  value={this.state.currentQuantity}
                  onChange={this.onChangeQuantity}
                />
              </FormGroup>
            </Col>
            <Col
              sm="2"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Button
                color={
                  this.state.currentDish &&
                  this.state.currentQuantity &&
                  'success'
                }
                onClick={this.onClickCheckDish}
              >
                <span
                  style={{ fontSize: 30 }}
                  className="buttonCheck fa fa-check-circle"
                />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleSelectMulti">details</Label>
                <Input
                  type="text"
                  placeholder="ex. not sauce"
                  onChange={this.onChangeDetails}
                  value={this.state.currentDetails}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Qty</th>
                  <th>Dish</th>
                  <th>Price</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.renderDishes()}
                <tr>
                  <th scope="row">#</th>
                  <td />
                  <th scope="row">Total</th>
                  <td>{this.totalOrder()}</td>
                  <td />
                </tr>
              </tbody>
            </Table>
          </Row>
        </ModalBody>
        <ModalFooter
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Button outline color="danger" onClick={onClickCancel}>
            <span className="fa fa-close" /> i don't
          </Button>
          <Button
            outline
            color="success"
            disabled={(this.state.order.length === 0 && true) || false}
            onClick={this.createOrder}
          >
            <span className="fa fa-users" /> join me
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmJoin;
