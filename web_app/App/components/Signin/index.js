import React from 'react';
import { Button } from 'reactstrap';
import './Signin.css';

const Signin = ({ changeView, signInGoogle }) => {
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
          <form className="card-body">
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
                Sign In
              </Button>
            </div>
            <div className="form-group">
              <Button
                style={{
                  backgroundColor: '#EA3434',
                  borderColor: '#EA3434',
                  cursor: 'pointer',
                }}
                onClick={signInGoogle}
              >
                <span className="fa fa-google fa-lg" /> Sign with Google
              </Button>
            </div>
            <Button onClick={() => changeView('SIGNUP')}>
              Signup on onflavor
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
