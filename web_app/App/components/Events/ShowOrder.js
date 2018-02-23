import React, { Component } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

class ShowOrder extends Component {
  state = {};

  onClickRemoveOrder = () => {
    this.props.removeOrder(this.props.order[0].order_id);
    this.props.toggleModal();
  };

  render() {
    const { order } = this.props;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
        <ModalHeader>already you have an order in this event</ModalHeader>
        <ModalBody>
          <Label>your order is:</Label>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col sm="3">Quantity</Col>
                <Col sm="3">Dish</Col>
                <Col sm="3">Sub Total</Col>
                <Col sm="3">Details</Col>
              </Row>
            </ListGroupItem>
            {order &&
              order.map(dish => (
                <ListGroupItem>
                  <Row>
                    <Col sm="3">{dish.quantity}</Col>
                    <Col sm="3">{dish.name}</Col>
                    <Col sm="3">{dish.price * dish.quantity}</Col>
                    <Col sm="3">{dish.details || '-'}</Col>
                  </Row>
                </ListGroupItem>
              ))}
            <ListGroupItem>
              <Row>
                <Col sm="3" />
                <Col sm="3">Total</Col>
                <Col sm="3">
                  {order &&
                    order.reduce(
                      (vi, dish) => vi + dish.price * dish.quantity,
                      0,
                    )}
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
        <ModalFooter
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Button outline color="danger" onClick={this.onClickRemoveOrder}>
            <span className="fa fa-circle-times" />delete order
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ShowOrder;
