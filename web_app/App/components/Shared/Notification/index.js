import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      color: 'gray',
      title: '',
      body: '',
    };
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  };

  setColor = color => {
    this.setState({ color });
  };

  setTitle = title => {
    this.setState({ title });
  };

  setBody = body => {
    this.setState({ body });
  };

  render() {
    return (
      <div>
        <span id="PopoverNotify" onClick={this.toggle}>
          {this.props.children(
            this.toggle,
            this.setColor,
            this.setBody,
            this.setTitle,
          )}
        </span>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="PopoverNotify"
          toggle={this.toggle}
        >
          <PopoverHeader style={{ backgroundColor: this.state.color }}>
            {this.state.title}
          </PopoverHeader>
          <PopoverBody>{this.state.body}</PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default Notification;
