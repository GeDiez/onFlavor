import React, { Component } from 'react';

import Menu from '../Shared/Menu';
import PlaceCard from './PlaceCard';

class Places extends Component{
  render() {
    const { history } = this.props;
    return (
      <div>
        <div className="row places">
          <div className="col-sm-3">
            Previous
          </div>
          <div className="col-sm-6">
            <PlaceCard />
          </div>
          <div className="col-sm-3">
            Next
          </div>
          <button className='btn-round'><span>+</span></button>
        </div>
      </div>
    );
  }
}

export default Places
