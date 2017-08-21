import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '../reducers';

import sessionMiddleware from '../middlewares/sessionMiddleware';
import playbackMiddleware from '../middlewares/playbackMiddleware';
import devicesMiddleware from '../middlewares/devicesMiddleware';
import { socketMiddleware } from '../middlewares/socketMiddleware';
import loggerMiddleware from '../middlewares/loggerMiddleware';
import socketMiddlewareDefault from '../middlewares/socketMiddleware';
import searchMiddleware from '../middlewares/searchMiddleware';

import { load } from '../actions/sessionActions';

export const initStore = (initialState = {}) => {
  const store = createStore(
    reducers(),
    initialState,
    applyMiddleware(
      thunk,
      sessionMiddleware,
      socketMiddleware,
      playbackMiddleware,
      devicesMiddleware,
      loggerMiddleware,
      searchMiddleware
    )
  );
  socketMiddlewareDefault(store);
  store.dispatch(load());
  return store;
};
