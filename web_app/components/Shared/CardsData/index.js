import React, { Component } from 'react';

import './index.css';

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
      <div className="cards-container">
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            next: this.next,
            previous: this.previous,
          }),
        )}
        <div id="card" className={`${toggleCard ? 'front' : 'back'}`}>
          {/* component 1 toggle=true*/}
          <LayoutComponent {...this.props} data={data[indexComp1]} />
        </div>
        <div id="card" className={`${toggleCard ? 'back' : 'front'}`}>
          {/* componen 2 toggle=false*/}
          <LayoutComponent {...this.props} data={data[indexComp2]} />
        </div>
      </div>
    );
  }
}
export default CardsData;
