import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';

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

  render() {
    const { user } = this.props;
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
          <PopoverHeader>{user.name}</PopoverHeader>
          <PopoverBody>{user.email}</PopoverBody>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserMenu);
