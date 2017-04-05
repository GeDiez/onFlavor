import React from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Navbar';
import LoginStore from '../../stores/LoginStore';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  }

  toggleLogin(ev) {
    ev.preventDefault();
    this.setState((prevState) => ({
      login: !prevState.login
    }));
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  async register(ev) {
    if (ev) ev.preventDefault();
    const { login, username, password, name, email } = this.state;
    if(login) {
      const token = await LoginStore.login({username, password});
    } else {
      await LoginStore.register({name, email, username, password});
    }
    browserHistory.push('/');
  }

  render() {
    const { login, name, email, username, password, confirmPassword } = this.state;
    return (
      <div>
        <Navbar />
        Hello World!
			</div>
    );
  }
}
