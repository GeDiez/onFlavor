import React from 'react';
import { browserHistory, Link } from 'react-router';

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
      const response = await LoginStore.login({username, password});
      if (response.ok) {
        browserHistory.push('/')
      } else {
        this.setState({
          error: 'username or password incorrect',
          password: ''
        });
      }
    } else {
      await LoginStore.register({name, email, username, password});
      browserHistory.push('/');
    }
  }

  async loginWithGoogle() {
    const response = await LoginStore.loginWithGoogle();
    if (response.ok) {
        browserHistory.push('/')
      } else {
        this.setState({
          error: 'something gone wrong, sorry xoxo',
          password: ''
        });
      }
  }

  render() {
    const { login, name, email, username, password, confirmPassword, error } = this.state;
    return (
      <div className="container-fluid ">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="text-center">
            <h1>On Flavor</h1>
          </div>
          <div className="row">
              <form>
                { !login &&
                  <div className="form-group">
                    <label htmlFor="name">Full name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={(ev) => this.onChange(ev)} value={name} placeholder="Enter your Name"/>
                  </div>
                }
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" name="username" id="username" onChange={(ev) => this.onChange(ev)} value={username} placeholder="Enter your Username"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" id="password" onChange={(ev) => this.onChange(ev)} value={password} placeholder="Enter your Password"/>
                </div>
                <input type="submit" value="Login" onClick={(ev) => this.register(ev)} className="btn btn-primary" />
                <div className="login-register form-group">
                  <a href="" onClick={(ev) => this.toggleLogin(ev)}>{!login ? 'Login form' : 'Create an account'}</a>
                </div>
                {
                  error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )
                }
              </form>
              <button className="btn btn-google" onClick={() => this.loginWithGoogle()}><i className="fa fa-google" /> Google</button>
            </div>
          </div>
        </div>
    );
  }
}
