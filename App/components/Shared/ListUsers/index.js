import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { blue300, indigo900 } from 'material-ui/styles/colors';

const OpenModal = ({ children, toggleModal }) => (
  <span onClick={toggleModal}>{children}</span>
);

class ListUsers extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = action => {
    if (action === undefined)
      return this.setState(state => ({ isOpen: !state.isOpen }));
    return this.setState({ isOpen: action });
  };

  renderUsers = () => {
    return this.props.users.map(user => (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Chip backgroundColor={blue300} style={{ margin: 4 }}>
          <Avatar size={32} color={blue300} backgroundColor={indigo900}>
            {user.role === 'owner' && 'Ow'}
            {user.role === 'Admin' && 'Ad'}
          </Avatar>
          {user.username}
        </Chip>
      </MuiThemeProvider>
    ));
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader className="header-modal">
            users in this event
          </ModalHeader>
          <ModalBody className="body-modal">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {this.renderUsers()}
            </div>
          </ModalBody>
        </Modal>
        {React.Children.map(children, child =>
          React.cloneElement(child, { toggleModal: this.toggleModal }),
        )}
      </div>
    );
  }
}

export { ListUsers, OpenModal };
