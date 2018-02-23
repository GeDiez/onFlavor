import React, { Component, Fragment } from 'react';
import { Alert, Row } from 'reactstrap';

import ButtonRound from '../Shared/ButtonRound';
import PlaceCard from './PlaceCard';
import AddPlace from './AddPlace';
import './index.css';

import PlacesRepository from '../../repository/places';

class Places extends Component {
  state = {
    places: [],
    isOpenedAddPlace: false,
    alert: {
      visible: false,
      type: '',
      msg: '',
    },
  };
  //functions cyclelife react
  componentDidMount() {
    this.loadPlaces();
  }
  //functions on repository places
  loadPlaces = async () => {
    const places = await PlacesRepository().getAll();
    this.setState({ places });
  };

  createPlace = async (_place, file) => {
    const place = await PlacesRepository().create(_place);
    if (place.errors) return this.notify('danger', 'Error: ' + place.errors);
    if (file) await PlacesRepository().uploadImage(place.id, file);
    this.notify('success', 'Se agrego el lugar exitosamente ');
    this.loadPlaces();
    this.toggleAddPlace();
  };

  updatePlace = placeId => async (_place, file) => {
    const place = await PlacesRepository().update(placeId, _place);
    if (place.errors) return this.notify('danger', 'Error: ' + place.errors);
    if (file) await PlacesRepository().uploadImage(placeId, file);
    this.notify('info', 'Se han guardado exitosamente los lugares');
    this.loadPlaces();
  };

  addDish = placeId => async _dish => {
    const dish = await PlacesRepository().addDish(placeId, _dish);
    if (dish.errors) return this.notify('danger', 'Error: ' + dish.errors);
    this.loadPlaces();
  };

  removeDish = placeId => async disheId => {
    await PlacesRepository().removeDish(placeId, disheId);
    await this.loadPlaces();
  };

  removePlace = async placeId => {
    await PlacesRepository().remove(placeId);
    this.notify('info', 'Se ha eliminado el lugar');
    this.loadPlaces();
  };
  //function to show notifies about places
  notify = (type, msg) => {
    this.setState({
      alert: {
        visible: true,
        type,
        msg,
      },
    });
  };

  closeNotify = () => {
    this.setState({
      alert: {
        visible: false,
        type: '',
        msg: '',
      },
    });
  };
  //methods to open Modals
  toggleAddPlace = isOpen => {
    if (isOpen === true || isOpen === false)
      return this.setState({ isOpenedAddPlace: isOpen });
    this.setState(state => ({
      isOpenedAddPlace: !state.isOpenedAddPlace,
    }));
  };

  renderPlaces = () => {
    return this.state.places.map(place => (
      <PlaceCard
        place={place}
        addDish={this.addDish(place.id)}
        removePlace={this.removePlace}
        updatePlace={this.updatePlace}
        removeDish={this.removeDish(place.id)}
      />
    ));
  };

  render() {
    const { state } = this;
    return (
      <Fragment>
        <Alert
          color={this.state.alert.type}
          isOpen={this.state.alert.visible}
          toggle={this.closeNotify}
        >
          {this.state.alert.msg}
        </Alert>
        <Row className="places">
          {this.renderPlaces()}
          <ButtonRound onClick={this.toggleAddPlace} />
        </Row>
        <AddPlace
          isOpen={state.isOpenedAddPlace}
          closeMe={this.toggleAddPlace}
          createPlace={this.createPlace}
        />
      </Fragment>
    );
  }
}

export default Places;
