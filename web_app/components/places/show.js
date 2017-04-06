import React from 'react';
import { browserHistory, Link } from 'react-router';
import PlacesStore from '../../stores/PlacesStore';
import DishStore from '../../stores/DishStore';
import {Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

export default class ShowPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      placeid: this.props.params.id,
      name: '',
      latitude: '',
      longitude: '',
      description: '',
      dishes: [],
      dishName: '',
      dishPrice: '',
    };
    this._handleChange = this._handleChange.bind(this);
    this._saveDish = this._saveDish.bind(this);
    this._updatePlaceDishesFromStore = this._updatePlaceDishesFromStore.bind(this);
    this._cleanDishInputForm = this._cleanDishInputForm.bind(this);
  }
  _updatePlaceDishesFromStore() {
    PlacesStore.getById(this.props.params.id, (place) => {
      this.setState({
        dishes: place.dishes,
      });
    });
  }
  _cleanDishInputForm() {
    this.setState({
      dishName: '',
      dishPrice: '',
    });
  }
  _openModal = () => {
    this.setState({
      isOpen: true
    });
  }

  _hideModal = () => {
    this.setState({
      isOpen: false
    });
  }

 _handleChange(e) {
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  _saveDish() {
    DishStore.saveDish(({
      place_id: this.state.placeid,
      name: this.state.dishName,
      price: this.state.dishPrice,
    }), (message) => {
      this._hideModal();
      this._updatePlaceDishesFromStore();
      this._cleanDishInputForm();
    });
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
        <span> {dish.name}</span>
        <label htmlFor="Price">Price: </label>
        <span> {dish.price}</span>
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
            <div className="form-group">
              <button type="button" className="btn btn-success col-md-2" onClick={this._openModal}>Add dish</button>

              {/* Modal form */}
              <Modal isOpen={this.state.isOpen} onRequestHide={this._hideModal}>
                <ModalHeader>
                  <ModalClose onClick={this._hideModal}/>
                  <ModalTitle>New dish</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <input type="hidden" name="placeid" value={this.state.placeid}/>
                  <div className="form-group">
                    <label htmlFor="dishName"> Name: </label>
                    <input type="text" name="dishName" value={this.state.dishName} onChange={this._handleChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dishPrice"> Price: </label>
                    <input type="number" name="dishPrice" value={this.state.dishPrice} onChange={this._handleChange}/>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button className='btn btn-default' onClick={this._hideModal}>
                    Close
                  </button>
                  <button className='btn btn-primary' onClick={this._saveDish}>
                    Save dish
                  </button>
                </ModalFooter>
              </Modal>
              {/* ---------------- */}

            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}