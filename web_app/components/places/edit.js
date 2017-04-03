import React from 'react';
import { browserHistory, Link } from 'react-router';
import PlacesStore from '../../stores/PlacesStore';

export default class EditPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
    this._editPlace = this._editPlace.bind(this);
  }

  componentWillMount(){
    PlacesStore.fetchPlaces((places) =>{
      this.setState({places: places});
    });
  }

  _editPlace() {
  }

  render() {
    let places = this.state.places.map(place =>{
      return <div key={place.id} className="row"> 
        <h5 className="col-sm-2">{place.name}</h5> 
        <Link to="/" className="btn btn-danger col-sm-1" params={{ placeid: place.id }}>Create Idea</Link>
        <button type="button" className="btn btn-info col-sm-1">Delete</button>
      </div>
    });

    return <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1>On flavor App:</h1>
          </div>
        </div>
        {places}
      </div>
    </div>;
  }
}