import * as types from './types'

const createSession = ({ session }) => ({
  type: types.CREATE_SESSION,
  session
});

export {
  createSession
};
