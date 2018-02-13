import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
} from 'reactstrap';

import eventsRepository from '../../repository/events';

class MyEvents extends Component {
  state = {
    events: [],
  };

  getMyEvents = async () => {
    const events = await eventsRepository().getMyEvents(this.props.user.id);
    this.setState({ events });
  };

  componentDidMount() {
    this.getMyEvents();
  }

  renderEvents = () =>
    this.state.events.map(event => (
      <Col sm="6" lg="3">
        <Card outline color="primary">
          <CardBody>
            <CardTitle>{event.description}</CardTitle>
            <CardText>{event.dateTime.toLocaleString()}</CardText>
          </CardBody>
          <CardFooter
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <ButtonGroup size="sm">
              {event.role === 'owner' && (
                <Button color="danger">
                  <span className="fa fa-trash" />
                </Button>
              )}
              <Button color="success">
                <span className="fa fa-list" />
              </Button>
              <Button color="info">
                <span className="fa fa-edit" />
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        {/* <EventCard
          key={event.idEvent}
          event={event}
          linksFooter={[
            { text: 'edit', onClick: () => console.log('send action edit') },
            {
              text: 'delete',
              onClick: () => console.log('send action delete'),
            },
          ]}
        /> */}
      </Col>
    ));

  render() {
    return (
      <div className="container">
        <h1>
          <small>All my events</small>
        </h1>
        <hr />
        <Row>{this.renderEvents()}</Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
});

export default connect(mapStateToProps)(MyEvents);
