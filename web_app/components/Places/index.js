import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

import Navbar from '../Navbar';
import PlacesStore from '../../stores/PlacesStore';

export default class PlacesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      isOpen: false,
      dishName: '',
      dishPrice: ''
    };
    this.deletePlace = this.deletePlace.bind(this);
    this._updatePlacesFromStore = this._updatePlacesFromStore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savePlace = this.savePlace.bind(this);
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

  render() {
    let places = this.state.places.map(place =>{
      return <tr key={place.id}>
        <td>{place.name}</td>
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
        <div className="place-image text-center" style={{ backgroundImage: 'url(http://videisimo.net/sites/default/files/comida-mexicana-17.jpg)'}}>
          <div className="info">
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
            <button onClick={this.openModal} className="btn btn-success">Add new</button>
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

    </div>;
  }
}
