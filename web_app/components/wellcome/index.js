import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import PlacesStore from '../../stores/PlacesStore';

export default class WellcomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentWillMount(){
    PlacesStore.fetchPlaces((places) =>{
      this.setState({places: places});
    });
  }

  render() {
    return <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h1>On flavor App:</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p>An app where you can create and add food orders</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ul>
              <li><Link to={`/places`} activeClassName="active">Places</Link></li>
              <li><Link to={`/events`} activeClassName="active">Events</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
  }
}
