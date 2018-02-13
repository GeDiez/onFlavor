import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import ButtonRound from '../Shared/ButtonRound';
import PlaceCard from './PlaceCard';
import './index.css';

import PlacesRepository from '../../repository/places';

class Places extends Component {
  state = {
    places: [],
  };

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces = async () => {
    const places = await PlacesRepository().get();
    this.setState({ places });
  };

  renderPlaces = () => {
    return this.state.places.map(place => <PlaceCard place={place} />);
  };

  render() {
    return (
      <Row className="places">
        {this.renderPlaces()}
        <ButtonRound />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps)(Places);
