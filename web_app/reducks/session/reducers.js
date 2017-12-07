import * as types from './types';

const initialState = {
  token: '',
  isAuthenticate: true
}

const sessionReducer = (state = initialState , action) => {
  switch( action.type ) {
    case types.createSession:
      return {
        ...state,
        ...action.session
      };
    default: return state;
  }
};

export default sessionReducer
