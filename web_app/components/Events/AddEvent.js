import React from 'react';
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

const AddEvent = props => {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader style={{ background: '#E0A025', color: 'white' }}>
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
              {props.places.map(place => <option>{place.name}</option>)}
            </Input>
          </FormGroup>
          <FormGroup>
            <label>date: </label>
            <Input type="date" placeholder="ex. delivery service food" />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="default" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button color="primary" className="miche-btn" onClick={props.addEvent}>
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEvent;
