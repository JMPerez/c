import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {useMemo} from 'react';

import { reducers } from '../reducers';

import sessionMiddleware from '../middlewares/sessionMiddleware';
import playbackMiddleware from '../middlewares/playbackMiddleware';
import devicesMiddleware from '../middlewares/devicesMiddleware';
import { socketMiddleware } from '../middlewares/socketMiddleware';
import loggerMiddleware from '../middlewares/loggerMiddleware';
import socketMiddlewareDefault from '../middlewares/socketMiddleware';
import searchMiddleware from '../middlewares/searchMiddleware';
import { load } from '../actions/sessionActions';
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchQueue } from '../actions/queueActions';
import { fetchUsers } from '../actions/usersActions';
import { fetchPlayingContext } from '../actions/playbackActions';
let store;
export const initStore = (initialState = {}) => {
  const store = createStore(
    reducers(),
    initialState,
    composeWithDevTools(applyMiddleware(
      thunk,
      sessionMiddleware,
      socketMiddleware,
      playbackMiddleware,
      devicesMiddleware,
      loggerMiddleware,
      searchMiddleware
    ))
  );
  socketMiddlewareDefault(store);
  store.dispatch(load());
  store.dispatch(fetchQueue()),
  store.dispatch(fetchUsers()),
  store.dispatch(fetchPlayingContext())
  return store;
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}