import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { operations as sessionOperations } from '../../reducks/session';

import Signin from '../Signin';
import Signup from '../Signup';
import Header from '../Header';
import Footer from '../Footer';
import LoadingFullPage from '../Shared/LoadingFullPage';

class Layout extends React.Component {
  state = {
    nameView: 'SIGNIN',
  };

  changeView = nameView => {
    this.setState({ nameView });
  };

  render() {
    return (
      <div>
        <Header />
        <LoadingFullPage visible={this.props.isLoading} />
        <div className="content-layout" />
        {this.state.nameView === 'SIGNIN' && (
          <Signin
            changeView={this.changeView}
            signInGoogle={this.props.signinUserGoogle}
          />
        )}
        {this.state.nameView === 'SIGNUP' && (
          <Signup changeView={this.changeView} />
        )}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(sessionOperations, dispatch);

export default connect(null, mapDispatchToProps)(Layout);
