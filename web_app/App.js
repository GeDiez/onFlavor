import React from 'react';

const App = React.createClass({
  propTypes: {
    content: React.PropTypes.element
  },

  getInitialState() {
    return {
      session: window.session
    };
  },

  render() {
    return <div>
      {React.cloneElement(this.props.content, {session: this.state.session})}
    </div>;
  }
});

export default App;
