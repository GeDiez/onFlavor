import React, { Component, Fragment } from 'react';

//Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { blue300, indigo900 } from 'material-ui/styles/colors';
import { Card, CardBody, CardText } from 'reactstrap';

import ConfirmJoin from './ConfirmJoin';

//Styles
import './EventCard.css';

const chips = users =>
  users &&
  users.map(user => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Chip backgroundColor={blue300} style={{ margin: 4 }}>
        <Avatar size={32} color={blue300} backgroundColor={indigo900}>
          {user.role === 'owner' && 'Ow'}
          {user.role === 'Admin' && 'Ad'}
        </Avatar>
        {user.fullname.split(' ')[0]}
      </Chip>
    </MuiThemeProvider>
  ));

class EventCard extends Component {
  state = {
    isOpenConfirmJoinModal: false,
  };

  openConfirmJoinModal = async () => {
    await this.props.loadPlace(this.props.event.place.id);
    this.setState({
      isOpenConfirmJoinModal: true,
    });
  };

  closeConfirmJoinModal = () => {
    this.setState({
      isOpenConfirmJoinModal: false,
    });
  };

  render() {
    const { event: { description, srcImage, users, place } } = this.props;
    return (
      <Fragment>
        <Card className="hover-card">
          <img
            className="image card-img-top"
            src={srcImage}
            height="300px"
            alt="some event"
            onClick={this.openConfirmJoinModal}
          />
          <CardBody>
            <CardText>
              Description: {description} <br />
              Place: {place.name}
            </CardText>

            {chips(users)}
          </CardBody>
        </Card>
        <ConfirmJoin
          isOpen={this.state.isOpenConfirmJoinModal}
          onClickCancel={this.closeConfirmJoinModal}
          onClickJoinme={this.joinmeEvent}
          place={this.props.place}
        />
      </Fragment>
    );
  }
}

export default EventCard;
