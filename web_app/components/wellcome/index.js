import React from 'react';
import { browserHistory } from 'react-router';

const WellcomeContainer = React.createClass ({
  getInitialState() {
    return {
      products: [ 'product 1', 'product 2']
    };
  },

  render() {
    return <div>
      <div className="container-fluid">
        <div className="row">
          <h1>Component:</h1>
          <span>Wellcome container</span>
        </div>
      </div>
    </div>;
  }
});

export default WellcomeContainer;
