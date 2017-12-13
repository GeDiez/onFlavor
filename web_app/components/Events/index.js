import React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Button,
  Input,
} from 'reactstrap';

import Menu from '../Shared/Menu';
import EventCard from './EventCard';

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddEventModal: false,
    };
  }

  showAllEvents = () =>
    this.props.events.map(event => (
      <EventCard
        key={event.idEvent}
        eventName={event.name}
        srcImage={event.srcImage}
        description={event.description}
        itemList={event.menu}
        linksFooter={[
          { text: 'Join me', onClick: () => console.log('send action') },
        ]}
      />
    ));

  toogleAddEventModal = () =>
    this.setState(state => ({ isAddEventModal: !state.isAddEventModal }));

  render() {
    const { isAddEventModal } = this.state;
    const { places } = this.props;
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '4em' }}>
          {this.showAllEvents()}
          <button className="btn-round" onClick={this.toogleAddEventModal}>
            <span>+</span>
          </button>
        </div>
        <Modal isOpen={isAddEventModal}>
          <ModalHeader>
            <label>Add a new Event</label>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <label>Event's name: </label>
                <Input type="text" placeholder="ex. Pizzas of little Cessar" />
              </FormGroup>
              <FormGroup>
                <label>place: </label>
                <Input type="select" placeholder="ex. delivery service food">
                  {places.map(place => <option>{place.name}</option>)}
                </Input>
              </FormGroup>
              <FormGroup>
                <label>date: </label>
                <Input type="text" placeholder="ex. delivery service food" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.toogleAddEventModal}>
              Cancel
            </Button>
            <Button color="primary" className="miche-btn">
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  places: state.places.places,
});

export default connect(mapStateToProps)(Events);
