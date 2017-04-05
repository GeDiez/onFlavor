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

  async register() {
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
      <div className="container">
			<div className="row main">
				<div className="panel-heading">
          <div className="panel-title text-center">
            <h1 className="title">{login ? 'Login' : 'Register'}</h1>
            <hr />
          </div>
        </div>
				<div className="main-login main-center">
					<form className="form-horizontal" method="post" action="#">

						{ !login &&
              <div className="form-group">
                <label htmlFor="name" className="cols-sm-2 control-label">Your Name</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="name" id="name" onChange={(ev) => this.onChange(ev)} value={name} placeholder="Enter your Name"/>
                  </div>
                </div>
              </div>
            }

            { !login &&
              <div className="form-group">
                <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" name="email" id="email" onChange={(ev) => this.onChange(ev)} value={email} placeholder="Enter your Email"/>
                  </div>
                </div>
              </div>
            }

						<div className="form-group">
							<label htmlFor="username" className="cols-sm-2 control-label">Username</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="username" id="username" onChange={(ev) => this.onChange(ev)} value={username} placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="password" id="password" onChange={(ev) => this.onChange(ev)} value={password} placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						{ !login &&
              <div className="form-group">
                <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" className="form-control" name="confirmPassword" id="confirm" onChange={(ev) => this.onChange(ev)} value={confirmPassword} placeholder="Confirm your Password"/>
                  </div>
                </div>
              </div>
            }

						<div className="form-group ">
							<button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={() => this.register()}>{login ? 'Login' : 'Register!'}</button>
						</div>
						<div className="login-register">
              <button className="btn btn-link" onClick={(ev) => this.toggleLogin(ev)}>{!login ? 'Login' : 'No account?'}</button>
            </div>
					</form>
				</div>
			</div>
		</div>
    );
  }
}
