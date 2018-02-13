import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Popover,
  PopoverBody,
  PopoverHeader,
  Button,
  ListGroupItem,
  ListGroup,
} from 'reactstrap';

import { actions as sessionActions } from '../../reducks/session';
import userRepository from '../../repository/user';

import './index.css';

class UserMenu extends Component {
  state = {
    isMenuVisible: false,
  };

  toggleMenu = () => {
    this.setState(state => ({
      isMenuVisible: !state.isMenuVisible,
    }));
  };

  logOut = async () => {
    await userRepository().logout();
    this.props.destroySession();
  };

  render() {
    const { session: { user } } = this.props;
    return (
      <div className="user-menu">
        <span
          id="user-menu"
          className="fa fa-user-circle fa-2x"
          onClick={this.toggleMenu}
        />
        <Popover
          placement="left"
          isOpen={this.state.isMenuVisible}
          target="user-menu"
          toggle={this.toggleMenu}
        >
          <PopoverHeader>
            <small style={{ fontWeight: 'bold' }}>My Profile</small>{' '}
          </PopoverHeader>
          <PopoverBody>
            <ListGroup>
              <ListGroupItem>{user.name}</ListGroupItem>
              <ListGroupItem>{user.email}</ListGroupItem>
              <Button color="danger" block onClick={this.logOut}>
                log Out
              </Button>
            </ListGroup>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(sessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
