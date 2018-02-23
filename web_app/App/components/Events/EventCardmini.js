import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  Button,
  ListGroup,
  ListGroupItem,
  Tooltip,
  Input,
} from 'reactstrap';

class EventCardmini extends Component {
  state = {
    modalAskForRemove: false,
    modalShowOrders: false,
    modalAddAdmin: false,
    tooltipAddAdmin: false,
    tooltipListOrders: false,
    orders: [],
    users: [],
    userAdmin: '',
  };

  getOrders = async () => {
    const orders = await this.props.getOrdersByEvent(this.props.event.id);
    if (!orders) return;
    if (Array.isArray(orders)) return this.setState({ orders });
    return this.setState({ orders: [orders] });
  };

  loadOrders = async () => {
    await this.getOrders();
    this.toggleVisible('modalShowOrders')();
  };

  loadUsers = async () => {
    const users = await this.props.getAllUsers();
    this.setState({ users });
  };

  //open modal
  toggleVisible = variable => () => {
    this.setState(state => ({ [variable]: !state[variable] }));
  };

  //handle text inputs
  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  };

  addAdmin = () => {
    this.props.addAdmin(this.props.event.id)(this.state.userAdmin);
    this.setState({ userAdmin: '' });
  };

  renderLisUsers = () => {
    return this.state.users.map(user => (
      <option value={user.id}>
        {user.fullname} - {user.email}
      </option>
    ));
  };

  renderOrders = () => {
    const orders = this.state.orders;
    return orders.map((order, i) => (
      <ListGroupItem>
        <Row>
          <Col sm="1">{i + 1}</Col>
          <Col sm="4">{order.users.username}</Col>
          <Col sm="6">
            <ul>
              {order.dishes.map(dish => (
                <li>
                  {dish.quantity} {dish.name} {dish.details}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </ListGroupItem>
    ));
  };

  render() {
    const { event, removeEvent } = this.props;
    return (
      <Col sm="6" lg="3">
        <Card outline color={event.role === 'owner' ? 'primary' : 'info'}>
          <CardBody>
            <CardTitle>{event.description}</CardTitle>
            <CardText>{event.dateTime.toLocaleString()}</CardText>
            <CardText>{event.place.name}</CardText>
          </CardBody>
          <CardFooter
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {event.role === 'admin' ? (
              <small>
                <i>admin</i>
              </small>
            ) : (
              ''
            )}
            <ButtonGroup size="sm">
              <Tooltip
                placement="auto"
                isOpen={this.state.tooltipAddAdmin}
                target={`add-admin-${event.id}`}
                toggle={this.toggleVisible('tooltipAddAdmin')}
              >
                Add a admin
              </Tooltip>
              <Button
                id={`add-admin-${event.id}`}
                outline
                color="info"
                onClick={() => {
                  this.loadUsers();
                  this.toggleVisible('modalAddAdmin')();
                }}
              >
                <span className="fa fa-user-plus" />
              </Button>
              <Tooltip
                placement="auto"
                isOpen={this.state.tooltipListOrders}
                target={`list-orders-${event.id}`}
                toggle={this.toggleVisible('tooltipListOrders')}
              >
                list of orders
              </Tooltip>
              <Button
                id={`list-orders-${event.id}`}
                color="success"
                onClick={this.loadOrders}
              >
                <span className="fa fa-list" />
              </Button>
              <Button color="info">
                <span className="fa fa-edit" />
              </Button>
              {event.role === 'owner' && (
                <Button
                  color="danger"
                  onClick={this.toggleVisible('modalAskForRemove')}
                >
                  <span className="fa fa-trash" />
                </Button>
              )}
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Modal isOpen={this.state.modalAskForRemove}>
          <ModalBody
            style={{
              width: '100%',
              background: '#292C52',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            do you want to remove this event? <br />Are you sure?
          </ModalBody>
          <ModalFooter
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button
              color="light"
              onClick={this.toggleVisible('modalAskForRemove')}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              className="miche-btn"
              onClick={removeEvent(event.id)}
              outline
            >
              <span className="fa fa-trash" />
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalShowOrders} size="lg">
          <ModalHeader
            style={{
              width: '100%',
              background: '#292C52',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            Orders to this Event
          </ModalHeader>
          <ModalBody>
            <ModalBody>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col sm="1">#</Col>
                    <Col sm="4">user</Col>
                    <Col sm="6">Dishes</Col>
                  </Row>
                </ListGroupItem>
                {this.renderOrders()}
              </ListGroup>
            </ModalBody>
          </ModalBody>
          <ModalFooter
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button
              color="danger"
              outline
              onClick={this.toggleVisible('modalShowOrders')}
            >
              <span className="fa fa-times-circle" />
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalAddAdmin}>
          <ModalBody
            style={{
              width: '100%',
              background: '#292C52',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            Add a admin if you are not at moment of the event:
            <Input type="select" onChange={this.handleChange('userAdmin')}>
              <option value="">select a user</option>
              {this.renderLisUsers()}
            </Input>
          </ModalBody>
          <ModalFooter
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button color="light" onClick={this.toggleVisible('modalAddAdmin')}>
              Cancel
            </Button>
            <Button
              color="info"
              className="miche-btn"
              onClick={this.addAdmin}
              outline
            >
              <span className="fa fa-user-plus" />
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
    );
  }
}

export default EventCardmini;
