import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
  CardFooter,
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Input,
} from 'reactstrap';

import GoogleMap from '../Shared/GoogleMaps';
import restaurantDefault from '@assets/images/restaurant_default.jpg';
import AddPlace from './AddPlace';

class PlaceCard extends Component {
  state = {
    modalMenuList: false,
    modalAskRemovePlace: false,
    modalLocation: false,
    modalAddPlace: false,
    name: '',
    price: '',
  };

  //open modal
  toggleModal = variable => () => {
    this.setState(state => ({ [variable]: !state[variable] }));
  };
  //controled inputs
  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  };

  updatePlace = (place, file) => {
    this.toggleModal('modalAddPlace')();
    this.props.updatePlace(this.props.place.id)(place, file);
  };

  onClickAddDish = ev => {
    ev.preventDefault();
    const { name, price } = this.state;
    if (name && price) this.props.addDish({ name, price });
  };

  onClickRemovePlace = () => {
    this.toggleModal('modalAskRemovePlace')();
    this.props.removePlace(this.props.place.id);
  };

  removeDish = dishId => {
    this.props.removeDish(dishId);
  };

  render() {
    const {
      place: {
        name,
        phoneNumber,
        description,
        address,
        srcImage,
        dishes,
        latitude,
        longitude,
      },
    } = this.props;
    return (
      <Col sm="6" lg="3">
        <Card>
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{description}</CardSubtitle>
          </CardBody>
          <img
            width="100%"
            src={srcImage || restaurantDefault}
            alt="Card cap"
          />
          <CardBody>
            <CardText>{address || 'No se pudo cargar la dirección'}</CardText>
            <CardText>{phoneNumber}</CardText>
          </CardBody>
          <CardFooter>
            <ButtonGroup size="sm">
              {latitude &&
                longitude && (
                  <Button
                    color="info"
                    outline
                    onClick={this.toggleModal('modalLocation')}
                  >
                    <span className="fas fa-map-marker-alt" />
                  </Button>
                )}

              <Button
                color="danger"
                onClick={this.toggleModal('modalAskRemovePlace')}
              >
                <span className="fa fa-trash" />
              </Button>
              <Button color="info" onClick={this.toggleModal('modalAddPlace')}>
                <span className="fa fa-edit" />
              </Button>
              <Button
                color="warning"
                onClick={this.toggleModal('modalMenuList')}
              >
                <span className="fa fa-utensils" />
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Modal
          isOpen={this.state.modalMenuList}
          toggle={this.toggleModal('modalMenuList')}
        >
          <ModalHeader
            style={{
              width: '100%',
              background: '#292C52',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            menu list
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              {dishes.map(dish => (
                <ListGroupItem>
                  <Row>
                    <Col
                      sm="6"
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      {dish.name}
                    </Col>
                    <Col sm="4">${dish.price}</Col>
                    <Col sm="2">
                      <Button
                        color="danger"
                        outline
                        onClick={() => this.removeDish(dish.id)}
                      >
                        <span className="fa fa-trash-alt" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
              <ListGroupItem>
                <Form>
                  <Row>
                    <Col sm="6">
                      <Input
                        type="text"
                        placeholder="add a dish"
                        onChange={this.handleChange('name')}
                        required
                      />
                    </Col>
                    <Col sm="4">
                      <Input
                        type="text"
                        placeholder="price"
                        onChange={this.handleChange('price')}
                        required
                      />
                    </Col>
                    <Col sm="2">
                      <Button
                        color="success"
                        outline
                        onClick={this.onClickAddDish}
                      >
                        <span className="fa fa-plus-circle" />
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </ListGroupItem>
            </ListGroup>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modalAskRemovePlace}
          toggle={this.toggleModal('modalAskRemovePlace')}
        >
          <ModalBody>
            <small>
              if place is been used by any event, you cannot delete it. <br />
              you going to remove this place. <strong>Are you sure?</strong>
            </small>
          </ModalBody>
          <ModalFooter
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button outline onClick={this.toggleModal('modalAskRemovePlace')}>
              <span className="fa fa-times-circle" /> cancel
            </Button>
            <Button outline color="danger" onClick={this.onClickRemovePlace}>
              <span className="fa fa-trash" /> remove
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          toggle={this.toggleModal('modalLocation')}
          isOpen={this.state.modalLocation}
        >
          <ModalHeader
            style={{
              width: '100%',
              background: '#292C52',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            Location
          </ModalHeader>
          <ModalBody>
            <GoogleMap
              isMarkerShown={false}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDB2XXwe603174C0a223kCwziM1PlpvamM&v=3.exp&libraries=places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              latitude={this.props.place.latitude}
              longitude={this.props.place.longitude}
            />
          </ModalBody>
        </Modal>
        <AddPlace
          update
          place={this.props.place}
          isOpen={this.state.modalAddPlace}
          closeMe={this.toggleModal('modalAddPlace')}
          updatePlace={this.updatePlace}
        />
      </Col>
    );
  }
}

export default PlaceCard;
