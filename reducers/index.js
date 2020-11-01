import { combineReducers } from 'redux';
import { useSelector, shallowEqual } from 'react-redux'

import queueReducer from '../reducers/queueReducer';
import sessionReducer from '../reducers/sessionReducer';
import playbackReducer from '../reducers/playbackReducer';
import devicesReducer, * as fromDevices from '../reducers/devicesReducer';
import usersReducer from '../reducers/usersReducer';
import searchReducer from '../reducers/searchReducer';

export const reducers = () =>
  combineReducers({
    queue: queueReducer,
    playback: playbackReducer,
    session: sessionReducer,
    users: usersReducer,
    search: searchReducer,
    devices: devicesReducer
  });

export const getDevices = state => fromDevices.getDevices(state.devices);

export const getIsFetchingDevices = state => fromDevices.getIsFetching(state.devices);


export const usePlayback = () =>  useSelector(
    (state) => ({
      playback: state.playback,
    }),
    shallowEqual
  );

export const useUsers = () => useSelector(
    (state) => ({
      users: state.users,
    }),
    shallowEqual
  )

export const useQueue = () => useSelector(
    (state) => ({
      queue: state.queue,
    }),
    shallowEqual
  )

export const useSession = () =>  useSelector(
    (state) => ({
      session: state.session,
    }),
    shallowEqual
  )