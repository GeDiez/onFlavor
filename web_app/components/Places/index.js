import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlaceCard from './PlaceCard';
import CardsData from '../Shared/CardsData';

class Places extends Component {
  render() {
    const { places } = this.props;
    return (
      <div>
        <div className="row places">
          <div className="col-sm-3">Previous</div>
          <div className="col-sm-6">
            <CardsData LayoutComponent={PlaceCard} data={places} />
          </div>
          <div className="col-sm-3">Next</div>
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
