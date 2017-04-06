import React from 'react';
import { browserHistory, Link } from 'react-router';

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
      <div className="col-sm-6 col-sm-offset-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <form>
                { !login &&
                  <div className="form-group">
                    <label htmlFor="name">Full name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={(ev) => this.onChange(ev)} value={name} placeholder="Enter your Name"/>
                  </div>
                }
                { !login &&
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" id="email" onChange={(ev) => this.onChange(ev)} value={email} placeholder="Enter your Email"/>
                  </div>
                }
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" name="Username" id="Username" onChange={(ev) => this.onChange(ev)} value={Username} placeholder="Enter your Username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" id="password" onChange={(ev) => this.onChange(ev)} value={password} placeholder="Enter your Password"/>
                </div>
                { !login &&
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="text" className="form-control" name="confirmPassword" id="confirmPassword" onChange={(ev) => this.onChange(ev)} value={email} placeholder="Enter your Email"/>
                  </div>
                }
                <input type="submit" value="Login" onClick={(ev) => this.register(ev)} className="btn btn-primary" />
                <div className="login-register">
                  <button className="btn btn-link" onClick={(ev) => this.toggleLogin(ev)}>{!login ? 'Login' : 'No account?'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
			</div>
    );
  }
}
