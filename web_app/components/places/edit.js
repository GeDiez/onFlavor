import React from 'react';
import { browserHistory, Link } from 'react-router';
import PlacesStore from '../../stores/PlacesStore';

export default class EditPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeid: this.props.params.id,
      place: [],
      name: '',
      latitude: '',
      longitude: '',
      description: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._savePlace = this._savePlace.bind(this);
  }

  componentWillMount(){
    PlacesStore.getById(this.props.params.id, (place) => {
      this.setState({
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
        description: place.description,
      });
    });

  }

  // _setPlaceId(value) {
  //   this.setState({ placeid: value});
  // }

  _savePlace() {
    PlacesStore.savePlace({
      placeid: this.state.placeid,
      name: this.state.name,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      description: this.state.description,
    })
  }

  _handleChange(e) {
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  render() {
    return <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1>On flavor App:</h1>
            <input type="hidden" name="placeid" value={this.state.placeid}/>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" value={this.state.name} onChange={this._handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="latitude">Latitude:</label>
              <input type="text" name="latitude" value={this.state.latitude} onChange={this._handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude:</label>
              <input type="text" name="longitude" value={this.state.longitude} onChange={this._handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" name="description" value={this.state.description} onChange={this._handleChange}/>
            </div>
            <input type="submit" value="Save" className="btn btn-primary" onClick={this._savePlace}/>
          </div>
        </div>
      </div>
    </div>;
  }
}