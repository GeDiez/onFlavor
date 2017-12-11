import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as joinReducers from './joinReducers';

const reducers = combineReducers(joinReducers);

const configureStore = (initialState = {}) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware)
  );
  return createStore(reducers, initialState, enhancer);
};

export default configureStore;
