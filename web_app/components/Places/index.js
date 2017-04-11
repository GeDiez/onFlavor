import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import PlacesStore from '../../stores/PlacesStore';

export default class PlacesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
    this.deletePlace = this.deletePlace.bind(this);
    this._updatePlacesFromStore = this._updatePlacesFromStore.bind(this);
  }

  componentWillMount() {
    this._updatePlacesFromStore();
  }

  _updatePlacesFromStore(){
    PlacesStore.fetchPlaces((places) =>{
      this.setState({places: places});
    });
  }

  deletePlace(place_id) {
    PlacesStore.deletePlace(place_id, response => {
      if (!response.error) {
        this.setState({
          places: this.state.places.filter(place => place.id != place_id)
        });
      } else {
        alert(`This place can't be deleted because is related to an event`);
      }
    });
  }

  render() {
    let places = this.state.places.map(place =>{
      return <tr key={place.id}>
        <td><label className="col-md-2">{place.name}</label></td>
        <td className="actions">
          <Link to={'/places/'+place.id }>Show</Link>
          <Link to={'/places/'+place.id+'/edit' }>Edit</Link>
          <a className="pointer" onClick={() => this.deletePlace(place.id)}>Delete</a>
        </td>
      </tr>
    });

    return <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>Places</h2>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {places}
              </tbody>
            </table>
            <Link to={'/places/new' } className="btn btn-success col-md-1">New</Link>
          </div>
        </div>
      </div>
    </div>;
  }
}
