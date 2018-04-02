import userRepository from '../../repository/user';
import * as actions from './actions';

const signinUserGoogle = () => async dispatch => {
  try {
    dispatch(actions.sessionPending());
    await userRepository().authenticateWithGoogle();
    const user = await userRepository().getCurrentUserToken();
    const AuthenticatedWithOnFlavor = await userRepository().authenticateOnFlavor(
      {
        token: user.token,
        idToken: user.idToken,
        provider: user.provider,
      },
    );

    if (
      AuthenticatedWithOnFlavor.status === 200 ||
      AuthenticatedWithOnFlavor.status === 201
    ) {
      const userAuth = AuthenticatedWithOnFlavor.data;
      dispatch(
        actions.createSession({
          token: user.token,
          providerSession: user.provider,
          isAuthenticate: true,
          user: {
            id: userAuth.id,
            name: userAuth.full_name,
            email: userAuth.email,
          },
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export { signinUserGoogle };
