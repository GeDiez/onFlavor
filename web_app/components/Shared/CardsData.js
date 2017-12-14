import React, { Component } from 'react';

import './CardsData.css';

class CardsData extends Component {
  state = {
    toggleCard: true,
    index: 0,
    indexComp1: 0,
    indexComp2: 0,
  };

  next = () =>
    this.setState(state => {
      const index =
        state.index === this.props.data.length - 1 ? 0 : state.index + 1;
      return {
        indexComp1: state.toggleCard ? state.indexComp1 : index,
        indexComp2: state.toggleCard ? index : state.indexComp2,
        toggleCard: !state.toggleCard,
        index,
      };
    });

  previous = () =>
    this.setState(state => {
      const index =
        state.index === 0 ? this.props.data.length - 1 : state.index - 1;
      return {
        indexComp1: state.toggleCard ? state.indexComp1 : index,
        indexComp2: state.toggleCard ? index : state.indexComp2,
        toggleCard: !state.toggleCard,
        index,
      };
    });

  render() {
    const { toggleCard, indexComp1, indexComp2 } = this.state;
    const { LayoutComponent, data } = this.props;
    return (
      <div>
        <div
          id="card"
          className={`${toggleCard ? 'front' : 'back'}`}
          style={{ position: toggleCard ? 'relative' : 'absolute' }}
        >
          {/* component 1 toggle=true*/}
          <LayoutComponent {...this.props} data={data[indexComp1]} />
        </div>
        <div
          id="card"
          className={`${toggleCard ? 'back' : 'front'}`}
          style={{ position: toggleCard ? 'absolute' : 'relative' }}
        >
          {/* componen 2 toggle=false*/}
          <LayoutComponent {...this.props} data={data[indexComp2]} />
        </div>
        <button onClick={this.previous}>Previous</button>
        <button onClick={this.next}>Next</button>
      </div>
    );
  }
}
export default CardsData;
