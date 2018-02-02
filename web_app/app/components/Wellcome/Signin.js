import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import './Signin.css';
import { operations } from '../../reducks/session';

const Signin = ({ signinAction, signinGoogleAction }) => {
  return (
    <div
      className="row"
      style={{ marginLeft: '5%', marginRight: '5%', marginTop: '10%' }}
    >
      <div className="col-sm-6">
        <h1 className="wellcome-text">Some description about On Flavor</h1>
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
              <Button outline className="btn-signin">
                <Link to="/onflavor/events">Sign In</Link>
              </Button>
            </div>
            <div className="form-group">
              <button
                className="btn btn-signin-google"
                onClick={signinGoogleAction}
              >
                <span className="fa fa-google fa-4" /> Sign In with Google
              </button>
            </div>
            <Link className="btn link-signup" to="/signup">
              Sign Up
            </Link>
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
