import * as types from './types';

const initialState = {
  //meta
  isLoading: '',
  errors: [],
  //information
  token: '',
  isAuthenticate: false,
  providerSession: '',
  user: {
    id: '',
    name: '',
    email: '',
  },
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.updateSession:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticate: action.payload.isAuthenticate,
        providerSession: action.payload.providerSession,
        user: action.payload.user,
      };
    case types.sessionPending:
      return {
        ...state,
        errors: action.errors,
        isLoading: action.meta.isLoading,
      };
    case types.sessionReject:
      return {
        ...state,
        isLoading: action.meta.isLoading,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default sessionReducer;
