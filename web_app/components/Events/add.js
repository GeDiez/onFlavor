import React from 'react';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import { TransitionView, Calendar, DateField } from 'react-date-picker'
import 'react-date-picker/index.css';

import Navbar from '../Navbar';
import EventsStore from '../../stores/EventsStore';
import PlacesStore from '../../stores/PlacesStore';

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      datetime: '',
      place_id: '',
      dateString: '',
      places: []
    }
    this.getPlaces();
  }

  async getPlaces() {
    PlacesStore.fetchPlaces((places) => {
      this.setState({places});
    })
  }

  onChange(ev) {
    if (ev) ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  onDateTimeChange(dateString) {
    this.setState({
      dateString,
      datetime: moment(dateString)
    });
  }

  async addEvent(ev) {
    if (ev) ev.preventDefault();
    const {name, description, dateString, place_id} = this.state;
    await EventsStore.addEvent({name, description, datetime: dateString, place_id});
    browserHistory.push('/events');
  }

  render() {
    const { name, description, datetime, places } = this.state;
    const placesOptions = places.map(p => (
      <option key={p.id} value={p.id}>{p.name}</option>
    ));
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <form onSubmit={(ev) => ev.preventDefault()}>
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
                <DateField
                  className="form-control"
                  dateFormat="YYYY-MM-DD HH:mm:ss"
                  placeholder="Select the date"
                  onChange={(ev) => this.onDateTimeChange(ev)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="place">Place</label>
                <select name="place_id" onChange={(ev) => this.onChange(ev)} className="form-control">
                  {placesOptions}
                </select>
              </div>
              <input type="submit" value="Add!" onClick={(ev) => this.addEvent(ev)} className="btn btn-primary" />
              </form>
            </div>
          </div>
        </div>
			</div>
    );
  }
}
