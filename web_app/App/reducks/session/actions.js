import * as types from './types';

const sessionPending = () => ({
  type: types.sessionPending,
  meta: {
    isLoading: true,
  },
});

const createSession = session => ({
  type: types.updateSession,
  payload: session,
  meta: { isLoading: false },
});

const sessionReject = errors => ({
  type: types.sessionReject,
  errors,
  meta: {
    isLoading: false,
  },
});

const destroySession = () => ({
  type: types.updateSession,
  payload: {
    token: '',
    isAuthenticate: false,
    providerSession: '',
  },
  meta: { isLoading: false },
});

export { createSession, destroySession, sessionPending, sessionReject };
