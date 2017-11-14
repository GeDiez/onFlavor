import React from 'react';
import { Router } from 'react-router-dom';

import Wellcome from './components/Wellcome';
import PlacesContainer from './components/Places';
import EditPlaces from './components/Places/edit';
import ShowPlaces from './components/Places/show';
import ShowEvents from './components/Events/show';
import Login from './components/Login';
import Events from './components/Events';
import MyEvents from './components/Events/myevents';
import Orders from './components/Orders';
import AddEvents from './components/Events/add';

const App = props => {
  return (
    <div>
      <Route path='/signup' component={Wellcome} />
    </div>
  )
}

// const App = React.createClass({
//   propTypes: {
//     content: React.PropTypes.element
//   },

//   getInitialState() {
//     return {
//       session: window.session
//     };
//   },

//   render() {
//     return <div>
//       {React.cloneElement(this.props.content, {session: this.state.session})}
//     </div>;
//   }
// });

export default App;