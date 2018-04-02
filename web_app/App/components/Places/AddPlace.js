import React, { Component, Fragment } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Button,
} from 'reactstrap';
import Dropzone from 'react-dropzone';

import GoogleMap from '../Shared/GoogleMaps';

class AddPlace extends Component {
  state = {
    placeId: '',
    name: '',
    address: '',
    phoneNumber: '',
    latitude: '',
    longitude: '',
    file: { name: '', preview: '' },
  };

  componentDidMount() {
    if (!this.props.update) return;
    const {
      place: { id, name, address, phoneNumber, latitude, longitude },
    } = this.props;
    this.setState({
      placeId: id,
      name,
      address,
      phoneNumber,
      latitude,
      longitude,
    });
  }

  //handle text inputs
  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  };

  //save image file on component's state
  onDrop = files => {
    const file = files[0];
    this.setState({ file });
  };

  setPlaceWithMaps = place => {
    this.setState({
      name: place.name,
      address: place.address,
      phoneNumber: 's/n',
      latitude: place.latitude,
      longitude: place.longitude,
    });
  };

  onClickAddPlace = async () => {
    const { name, address, phoneNumber, latitude, longitude } = this.state;
    this.props.createPlace(
      {
        name,
        address,
        phoneNumber,
        latitude,
        longitude,
      },
      this.state.file,
    );
  };

  onClickUpdatePlace = async () => {
    const { name, address, phoneNumber, latitude, longitude } = this.state;
    this.props.updatePlace(
      {
        name,
        address,
        phoneNumber,
        latitude,
        longitude,
      },
      this.state.file,
    );
  };

  render() {
    const { props, state } = this;
    return (
      <Fragment>
        <Modal
          isOpen={props.isOpen}
          style={{ borderColor: '#292C52', borderWidht: '5px' }}
          toggle={props.closeMe}
        >
          <Form>
            <ModalHeader
              style={{
                background: '#292C52',
                color: 'white',
                justifyContent: 'center',
              }}
            >
              <Label>{this.props.update ? 'Update Place' : 'Add Place'}</Label>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Name: </Label>
                <Input
                  type="text"
                  placeholder="Name of place"
                  value={state.name}
                  onChange={this.handleChange('name')}
                  autoComplete="name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Number phone </Label>
                <Input
                  type="text"
                  placeholder="phone number"
                  value={state.phoneNumber}
                  onChange={this.handleChange('phoneNumber')}
                  autoComplete="tel"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="text"
                  placeholder="address"
                  value={state.address}
                  onChange={this.handleChange('address')}
                  autoComplete="address"
                  required
                />
              </FormGroup>
              <FormGroup
                style={{
                  widht: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <Dropzone
                  onDrop={this.onDrop}
                  style={{
                    width: '100%',
                    height: '200px',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'dashed',
                    borderRadius: '5px',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {!state.file.name && <Label>upload image (optional)</Label>}
                  <img
                    src={state.file.preview}
                    alt=""
                    width="200px"
                    height="150px"
                  />
                  <small>{state.file.name}</small>
                </Dropzone>
              </FormGroup>
              <FormGroup>
                <GoogleMap
                  getPlace={this.setPlaceWithMaps}
                  isMarkerShown={false}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDB2XXwe603174C0a223kCwziM1PlpvamM&v=3.exp&libraries=places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onClick={props.closeMe}>
                Cancel
              </Button>
              {this.props.update && (
                <Button
                  color="info"
                  className="miche-btn"
                  onClick={this.onClickUpdatePlace}
                >
                  update
                </Button>
              )}
              {!this.props.update && (
                <Button
                  color="primary"
                  className="miche-btn"
                  onClick={this.onClickAddPlace}
                >
                  Add
                </Button>
              )}
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default AddPlace;
