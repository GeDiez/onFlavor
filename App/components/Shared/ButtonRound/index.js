import React, { Component } from 'react';

import './index.css';

class componentName extends Component {
  render() {
    return (
      <button className="btn-round" onClick={this.props.onClick}>
        <span className="fa fa-plus fa-lg" />
      </button>
    );
  }
}

export default componentName;
