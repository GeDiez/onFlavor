import React, { Component } from 'react';
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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo900 } from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Notification from '../Shared/Notification';
import eventRepository from '../../repository/events';

const MAX_HOUR = 20;
const MIN_HOUR = 7;

class AddEvent extends Component {
  constructor() {
    super();
    let initDate = new Date();
    if (initDate.getHours() > MAX_HOUR || initDate.getHours() < MIN_HOUR) {
      initDate.setTime(initDate.getTime() + 24 * 60 * 60 * 1000);
      initDate.setHours(7, 0, 0);
    }
    this.state = {
      minDate: initDate,
      name: '',
      decription: '',
      datetime: initDate,
      placeId: '',
    };
  }

  onChangeName = ev => {
    this.setState({ name: ev.target.value });
  };

  onChangeDescription = description => {
    this.setState({ description });
  };

  onChangeDate = datetime => {
    this.setState({ datetime: datetime.target.value });
  };

  onChangePlace = place => {
    this.setState({ placeId: place.target.value });
  };

  onClickAddEvent = () => {
    eventRepository.create(this.state);
  };

  onChangeDate = date => {
    this.setState(state => {
      const datetime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        state.datetime.getHours(),
        state.datetime.getMinutes(),
        state.datetime.getSeconds(),
      );
      return { datetime };
    });
  };

  onChangeTime = (date, toggle, setColor, setBody, setTitle) => {
    if (date.getHours() < 7 || date.getHours() > 20) {
      setColor('#f8d7da');
      setTitle('Verifica tus datos');
      setBody(
        `Las horas validas para eventos son de ${MIN_HOUR} a ${MAX_HOUR} hrs`,
      );
      toggle();
      return;
    }
    this.setState(state => {
      const datetime = new Date(
        state.datetime.getFullYear(),
        state.datetime.getMonth(),
        state.datetime.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      );
      return { datetime };
    });
  };

  render() {
    const { props, state } = this;
    return (
      <Form>
        <Modal
          isOpen={props.isOpen}
          style={{ borderColor: '#292C52', borderWidht: '5px' }}
        >
          <ModalHeader
            style={{
              background: '#292C52',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            <label>Add a new Event</label>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Event's name: </label>
              <Input
                type="text"
                placeholder="ex. Pizzas of little Cessar"
                value={state.name}
                onChange={this.onChangeName}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Some description about it: </label>
              <Input
                type="text"
                placeholder="Why do you do it?"
                value={state.name}
                onChange={this.onChangeName}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>place: </label>
              <Input
                type="select"
                placeholder="ex. delivery service food"
                onChange={this.onChangePlace}
              >
                {props.places.map(place => (
                  <option value={place.id}>{place.name}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <label>date and time: </label>
              <MuiThemeProvider
                muiTheme={getMuiTheme({
                  palette: {
                    primary1Color: indigo900,
                    primary2Color: indigo900,
                    pickerHeaderColor: indigo900,
                  },
                })}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <DatePicker
                    onChange={(_, date) => this.onChangeDate(date)}
                    value={this.state.datetime}
                    hintText="Date to event"
                    minDate={this.state.minDate}
                    style={{ width: '30%' }}
                  />
                  <Notification style={{ marginLeft: '2em', width: '30%' }}>
                    {(toggle, setColor, setBody, setTitle) => (
                      <TimePicker
                        onChange={(_, date) =>
                          this.onChangeTime(
                            date,
                            toggle,
                            setColor,
                            setBody,
                            setTitle,
                          )
                        }
                        value={this.state.datetime}
                        hintText="Time to event"
                      />
                    )}
                  </Notification>
                </div>
              </MuiThemeProvider>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={props.closeModal}>
              Cancel
            </Button>
            <Button
              color="primary"
              className="miche-btn"
              onSubmit={props.addEvent}
            >
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}

export default AddEvent;

// class ModalChida extends Component {
//   state = {
//     isOpened: false,
//   };

//   toggleModal = () => {
//     this.setState(state => ({ isOpened: !state.isOpened }));
//   };

//   render() {
//     return (
//       <Modal>
//         {React.Children.map(this.props.children, child =>
//           React.cloneElement(child, { toggleModal: this.toggleModal }),
//         )}
//       </Modal>
//     );
//   }
// }

// class ButtonToggleModal extends Component {
//   render() {
//     return (
//       <Button onClick={this.props.ToggleModal}>{this.props.children}</Button>
//     );
//   }
// }

// <ModalChida>
//   <ModalHeader>Header</ModalHeader>
//   <ModalBody>body</ModalBody>
//   <ButtonToggleModal>OpenModal</ButtonToggleModal>
// </ModalChida>;
