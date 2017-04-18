import React from 'react';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';

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
      places: [],
      m: moment(),
      showCalendar: false
    }
    this.getPlaces();
    this.handleChange = this.handleChange.bind(this);
    this.savePlace = this.savePlace.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateSave = this.handleDateSave.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.params;
    if (id) {
      const event = await EventsStore.getEventById(id);
      this.setState({
        name: event.name,
        description: event.description,
        place_id: event.place_id,
        m: moment(event.date_time)
      });
    }
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

  async saveEvent(ev) {
    if (ev) ev.preventDefault();
    const {name, description, m, place_id} = this.state;
    await EventsStore.addEvent({
      name,
      description,
      datetime: m.format(),
      place_id,
      id: this.props.params.id || null
    });
    browserHistory.push('/events');
  }

  savePlace() {
    PlacesStore.savePlace(({
      name: this.state.placeName,
      description: this.state.placeDescription,
    }), (response) => {
      if (response.error) {
        alert(response.error);
      } else {
        this.setState({
          places: [...this.state.places, response]
        }, this.hideModal);
      }
    });
  }

  openModal = () => {
    this.setState({
      isOpen: true
    });
  }

  hideModal = () => {
    this.setState({
      isOpen: false,
      placeName: '',
      placeDescription: ''
    });
  }

  handleChange(e) {
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleDateSave() {
    console.log('saved', this.state.m.format('llll'));
    this.setState({
      showCalendar: false
    })
  }

  handleDateChange(m) {
    this.setState({ m });
  }

  toggleCalendar() {
    this.setState({
      showCalendar: !this.state.showCalendar
    })
  }

  render() {
    const { name, description, datetime, places, showCalendar } = this.state;
    const placesOptions = places.map(p => (
      <option key={p.id} value={p.id}>{p.name}</option>
    ));
    let displayCalendar = showCalendar ? 'block' : 'none';

    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2>{ this.props.params.id ? 'Edit event' : 'Event creation'}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <form onSubmit={(ev) => ev.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Event Name</label>
                  <input type="text" className="form-control" name="name" id="name" onChange={(ev) => this.onChange(ev)} value={name} placeholder="Enter the Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" name="description" id="description" onChange={(ev) => this.onChange(ev)} value={description} placeholder="Description:"/>
                </div>
              <div className="form-group">
                <label htmlFor="datetime">When?</label>
                <div className="input-group pointer">
                  <input type="text" className="form-control pointer" value={this.state.m.format('lll')} readOnly={true} onClick={this.toggleCalendar} />
                  <div className="input-group-addon" onClick={this.toggleCalendar}>
                    <i className="glyphicon glyphicon-calendar"></i>
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <InputMoment
                    style={{ float: 'right', position: 'absolute', top: '0px', marginTop: '-12px', background: 'white', display: displayCalendar }}
                    moment={this.state.m}
                    onChange={this.handleDateChange}
                    onSave={this.handleDateSave}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="place">Place</label>
                <button className="btn btn-link" onClick={this.openModal}>+</button>
                <select name="place_id" value={this.state.place_id} onChange={(ev) => this.onChange(ev)} className="form-control">
                  <option value="-1"></option>
                  {placesOptions}
                </select>
              </div>
              <input type="submit" value={this.props.params.id ? 'Save' : 'Create'} onClick={(ev) => this.saveEvent(ev)} className="btn btn-success" />
              </form>
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>New place</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="form-group">
                <label htmlFor="placeName">Name: </label>
                <input type="text" name="placeName" value={this.state.placeName} onChange={this.handleChange} className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="placeDescription">Description: </label>
                <input type="text" name="placeDescription" value={this.state.placeDescription} onChange={this.handleChange} className="form-control"/>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary col-sm-12" onClick={this.savePlace}>Save</button>
          </ModalFooter>
        </Modal>

			</div>
    );
  }
}
