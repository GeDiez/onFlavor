import types from './types';

const initialState = {
  name: 'Juan AmezQA',
  email: 'jhonathan@michelada.io',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
