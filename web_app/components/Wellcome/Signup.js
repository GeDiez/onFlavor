import React from 'react';

const Signup = ({ signinAction, signinGoogleAction, history }) => (
  <div
    className="row"
    style={{ marginLeft: '5%', marginRight: '5%', marginTop: '10%' }}
  >
    <div className="col-sm-6">
      <p className="wellcome-text">Information about Registry</p>
    </div>
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="card-text">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your fullname"
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-signin" onClick={signinAction}>
              Sign Up
            </button>
          </div>
          <div className="form-group">
            <button
              className="btn btn-signin-google"
              onClick={signinGoogleAction}
            >
              <span className="fa fa-google fa-4" /> Sign Un with Google
            </button>
          </div>
          <button
            className="btn link-signup"
            onClick={() => history.push('/signin')}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Signup;
