import React from 'react';
import { browserHistory } from 'react-router';
import PlacesStore from '../../stores/PlacesStore';

const WellcomeContainer = React.createClass ({
  getInitialState() {
    return {
      places: [],
    };
  },

  componentWillMount(){
    PlacesStore.fetchPlaces((places) =>{
      this.setState({places: places});
    });
  },

  render() {
    let places = this.state.places.map(place =>{
      return <div key={place.id}> 
        <h4>Name: {place.name}</h4>
        <button type="button" className="btn btn-danger">Delete</button>
      </div>
    });

    return <div>
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
              <li> <a href=""></a> </li>
              <li> <a href=""></a> </li>
              <li> <a href=""></a> </li>
              <li> <a href=""></a> </li>
            </ul>
          </div>
        </div>
        <h4>{places}</h4>

      </div>
    </div>;
  }
});

export default WellcomeContainer;
