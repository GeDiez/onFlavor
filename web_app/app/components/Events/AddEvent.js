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
  Label,
} from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo900 } from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Notification from '../Shared/Notification';
// import UploadImage from '../Shared/UploadImage/index';
import Dropzone from 'react-dropzone';

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
      decription: '',
      datetime: initDate,
      placeId: '',
      eventId: '',
      file: { name: '', preview: '' },
    };
  }
  //save image file on component's state
  onDrop = files => {
    const file = files[0];
    this.setState({ file });
  };

  //handle text inputs
  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  };

  onClickAddEvent = async () => {
    const { placeId, datetime, description } = this.state;
    this.props.createEvent(
      {
        place_id: placeId,
        date_time: datetime,
        description,
        image_url: '',
      },
      this.state.file,
    );
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
      <Modal
        isOpen={props.isOpen}
        style={{ borderColor: '#292C52', borderWidht: '5px' }}
      >
        <Form>
          <ModalHeader
            style={{
              background: '#292C52',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            <Label>Add a Event</Label>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Some description about it: </Label>
              <Input
                type="text"
                placeholder="some description about this"
                value={state.description}
                onChange={this.handleChange('description')}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>place: </Label>
              <Input
                type="select"
                placeholder="ex. delivery service food"
                onChange={this.handleChange('placeId')}
              >
                <option value="">select a place</option>
                {props.places.map(place => (
                  <option value={place.id}>{place.name}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>date and time: </Label>
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
            <FormGroup
              style={{
                widht: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Dropzone
                onDrop={this.onDrop}
                style={{
                  width: '100%',
                  height: '200px',
                  borderWidth: '2px',
                  borderColor: 'rgb(102, 102, 102)',
                  borderStyle: 'dashed',
                  borderRadius: '5px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {!state.file.name && <Label>upload image (optional)</Label>}
                <img
                  src={state.file.preview}
                  alt=""
                  width="200px"
                  height="150px"
                />
                <small>{state.file.name}</small>
              </Dropzone>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={props.closeModal}>
              Cancel
            </Button>
            <Button
              color="primary"
              className="miche-btn"
              onClick={this.onClickAddEvent}
            >
              Add
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default AddEvent;
