import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import EventsStore from '../../stores/EventsStore';
import PlacesStore from '../../stores/PlacesStore';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      datetime: '',
      place: '',
      places: []
    }
    this.getPlaces();
  }

  async getPlaces() {
    PlacesStore.fetchPlaces((places) => {
      this.setState({places: places});
    })
  }

  render() {
    const { name, description, datetime, place, places } = this.state;
    const placesOptions = places.map(p => (
      <option key={p.id}>{p.name}</option>
    ));
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" name="name" id="name" onChange={(ev) => this.onChange(ev)} value={name} placeholder="Enter the Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" name="description" id="description" onChange={(ev) => this.onChange(ev)} value={description} placeholder="Description:"/>
                </div>
              <div className="form-group">
                <label htmlFor="datetime">When?</label>
                <input type="text" className="form-control" name="datetime" id="datetime" onChange={(ev) => this.onChange(ev)} value={datetime} placeholder="Enter the date"/>
              </div>
              <div className="form-group">
                <label htmlFor="place">Place</label>
                <select className="form-control">
                  {placesOptions}
                </select>

              </div>
              </form>
            </div>
          </div>
        </div>
			</div>
    );
  }
}
