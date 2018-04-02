import React, { Component, Fragment } from 'react';

//Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { blue300, indigo900 } from 'material-ui/styles/colors';
import { Card, CardBody, CardText } from 'reactstrap';

import ConfirmJoin from './ConfirmJoin';
import ShowOrder from './ShowOrder';
import eventDefault from '@assets/images/crockery.jpg';

//Styles
import './EventCard.css';

const chips = users =>
  users &&
  users.map(user => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Chip backgroundColor={blue300} style={{ margin: 4 }}>
        <Avatar size={32} color={blue300} backgroundColor={indigo900}>
          {user.role === 'owner' && 'Owr'}
          {user.role === 'admin' && 'Adm'}
        </Avatar>
        {user.fullname.split(' ')[0]}
      </Chip>
    </MuiThemeProvider>
  ));

class EventCard extends Component {
  state = {
    isOpenConfirmJoinModal: false,
    showOrderModal: false,
    order: null,
  };

  //open modal
  toggleModal = variable => () => {
    this.setState(state => ({ [variable]: !state[variable] }));
  };

  openConfirmJoinModal = async () => {
    const order = await this.props.getOrderOfUser(this.props.event.id);
    if (order)
      return this.setState({
        showOrderModal: true,
        order,
      });
    await this.props.loadPlace(this.props.event.place.id);
    this.setState({
      isOpenConfirmJoinModal: true,
    });
  };

  closeConfirmJoinModal = async () => {
    this.setState({
      isOpenConfirmJoinModal: false,
    });
  };

  render() {
    const {
      event: { id, description, srcImage, users, place, dateTime },
    } = this.props;
    return (
      <Fragment>
        <Card className="hover-card">
          <img
            className="image card-img-top"
            src={srcImage || eventDefault}
            height="300px"
            alt="some event"
            onClick={this.openConfirmJoinModal}
          />
          <CardBody>
            <CardText>
              Description: {description} <br />
              Place: {place.name} <br />
              Date time: {dateTime.toLocaleString()}
            </CardText>
            {chips(users)}
          </CardBody>
        </Card>
        <ConfirmJoin
          isOpen={this.state.isOpenConfirmJoinModal}
          onClickCancel={this.closeConfirmJoinModal}
          onClickJoinme={this.joinmeEvent}
          place={this.props.place}
          createOrder={this.props.createOrder(id)}
          showAlert={this.props.showAlert}
        />
        <ShowOrder
          isOpen={this.state.showOrderModal}
          order={this.state.order}
          toggleModal={this.toggleModal('showOrderModal')}
          removeOrder={this.props.removeOrder(this.props.event.id)}
        />
      </Fragment>
    );
  }
}

export default EventCard;
