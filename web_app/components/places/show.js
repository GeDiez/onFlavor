import React from 'react';
import { browserHistory, Link } from 'react-router';
import PlacesStore from '../../stores/PlacesStore';

export default class ShowPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeid: this.props.params.id,
      name: '',
      latitude: '',
      longitude: '',
      description: '',
      dishes:[],
    }
  }

  componentWillMount(){
    PlacesStore.getById(this.props.params.id, (place) => {
      this.setState({
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
        description: place.description,
        dishes: place.dishes,
      });
    });
  }

  render() {
    let dishes = this.state.dishes.map((dish) => {
      return <div key={dish.id}> 
        <label htmlFor="Name">Name: </label>
        <span>{dish.name}</span>
      </div>
    });

    return <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1>On flavor App:</h1>
            <div className="form-group">
              <label htmlFor="name"> Name:</label>
              <span name="name"> {this.state.name} </span>
            </div>
            <div className="form-group">
              <label htmlFor="latitude">Latitude:</label>
              <span name="latitude"> {this.state.latitude} </span>
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude:</label>
              <span name="longitude"> {this.state.longitude} </span>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <span name="description"> {this.state.description} </span>
            </div>
            <div className="form-group">
              <label htmlFor="dishes">Dishes: </label>
              {dishes}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}