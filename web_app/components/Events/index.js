import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import LoginStore from '../../stores/LoginStore';

export default class Login extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        Hello World!
			</div>
    );
  }
}
