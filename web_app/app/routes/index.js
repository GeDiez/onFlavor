import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Gapi from '../../utils/gapi';
import userRepository from '../repository/user';
import { actions as sessionActions } from '../reducks/session';

import AuthenticateRoute from './AuthenticateRoute';
import LayoutApp from '../components/Layouts/LayoutApp';
import Wellcome from '../components/Layouts/Layout';
import Events from '../components/Events';
import Places from '../components/Places';
import MyEvents from '../components/Events/MyEvents';

const privatesRoutes = [
  {
    path: '/',
    component: Events,
  },
  {
    path: '/places',
    component: Places,
  },
  {
    path: '/myevents',
    component: MyEvents,
  },
];

class Routes extends Component {
  componentDidMount() {
    this.loadUserStored();
  }

  loadUserStored = async () => {
    await Gapi.init();
    const user = userRepository().getCurrentUserToken();
    if (!user) return;
    const AuthenticatedWithOnFlavor = await userRepository().authenticateOnFlavor(
      user,
    );
    if (
      AuthenticatedWithOnFlavor.status === 200 ||
      AuthenticatedWithOnFlavor.status === 201
    ) {
      const userAuth = AuthenticatedWithOnFlavor.data.user;
      console.log(userAuth);
      this.props.createSession({
        token: user.token,
        providerSession: user.provider,
        isAuthenticate: true,
        user: {
          id: userAuth.id,
          name: userAuth.fullname,
          email: userAuth.email,
        },
      });
    }
  };

  render() {
    const { session: { isAuthenticate } } = this.props;
    if (!isAuthenticate) return <Wellcome />;
    return (
      <AuthenticateRoute
        isAuthenticate={isAuthenticate}
        PrivateComponent={LayoutApp}
        path="/"
        routes={privatesRoutes}
      />
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(sessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
