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
  state = {
    loading: false,
  };

  componentDidMount() {
    this.loadUserStored();
  }

  loadUserStored = async () => {
    this.setState({ loading: true });
    await Gapi.init();
    const user = userRepository().getCurrentUserToken();
    if (!user) return this.setState({ loading: false });
    const AuthenticatedWithOnFlavor = await userRepository().authenticateOnFlavor(
      user,
    );
    if (
      AuthenticatedWithOnFlavor.status === 200 ||
      AuthenticatedWithOnFlavor.status === 201
    ) {
      const userAuth = AuthenticatedWithOnFlavor.data.user;
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
    this.setState({ loading: false });
  };

  render() {
    const { session: { isAuthenticate } } = this.props;
    if (!isAuthenticate) return <Wellcome isLoading={this.state.loading} />;
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
