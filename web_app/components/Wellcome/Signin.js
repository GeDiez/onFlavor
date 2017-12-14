import React from 'react';
import { connect } from 'react-redux';

import { operations } from '../../reducks/session';

const Signin = ({ signinAction, signinGoogleAction, history }) => {
  return (
    <div
      className="row"
      style={{ marginLeft: '5%', marginRight: '5%', marginTop: '10%' }}
    >
      <div className="col-sm-6">
        <p className="wellcome-text">Some description about On Flavor</p>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <div className="card-text">
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form-group">
              <button
                className="btn btn-signin"
                onClick={() => history.push('/onflavor/events')}
              >
                Sign In
              </button>
            </div>
            <div className="form-group">
              <button
                className="btn btn-signin-google"
                onClick={signinGoogleAction}
              >
                <span className="fa fa-google fa-4" /> Sign In with Google
              </button>
            </div>
            <button
              className="btn link-signup"
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.session,
});

export default connect(mapStateToProps)(Signin);
