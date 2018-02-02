import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';

import PlaceCard from './PlaceCard';
import CardsData from '../Shared/CardsData';
import './index.css';

const Buttons = props => (
  <ButtonGroup className="buttons-container">
    <Button className="btn-place-card" onClick={props.previous}>
      Previous
    </Button>
    <Button className="btn-place-card" onClick={props.next}>
      Next
    </Button>
  </ButtonGroup>
);

class Places extends Component {
  render() {
    const { places } = this.props;
    return (
      <div>
        <div className="row places">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <CardsData LayoutComponent={PlaceCard} data={places}>
              <Buttons />
              <hr />
            </CardsData>
          </div>
          <div className="col-sm-3" />
          <button className="btn-round">
            <span>+</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps)(Places);
