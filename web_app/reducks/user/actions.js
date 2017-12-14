import types from './types';

const fetchUser = ({ user }) => ({
  type: types.fetchUser,
  user,
});

export { fetchUser };
