import apiOnFlavor from '../../../utils/apiOnFlavor';

const userRepository = () => {
  const getCurrentUserToken = () => {
    //Search for someone user is login with Google
    const GoogleAuth = gapi.auth2.getAuthInstance();
    const user = GoogleAuth.currentUser.get();
    if (!user) return false;
    const AuthResponse = user.getAuthResponse(true);
    if (!AuthResponse) return false;
    return {
      provider: 'google',
      token: AuthResponse.access_token,
      idToken: AuthResponse.id_token,
    };
  };

  const authenticateWithGoogle = async () => {
    //User is authenticate through Google server's
    const GoogleAuth = gapi.auth2.getAuthInstance();
    await GoogleAuth.signIn();
  };

  const logout = () => {
    //Log out user with gapi; revoke credentials from local storage
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut();
  };

  const authenticateOnFlavor = async ({ token, provider, idToken }) => {
    //User is authenticate through OnFlavor server's
    try {
      const response = apiOnFlavor.POST('/user/auth', {
        provider,
        token,
        id_token: idToken,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const getAll = async () => {
    try {
      const response = await apiOnFlavor.GET(`/users`);
      return response.data.errors ? response.data : response.data.users;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  return {
    authenticateOnFlavor,
    authenticateWithGoogle,
    getCurrentUserToken,
    logout,
    getAll,
  };
};

export default userRepository;
