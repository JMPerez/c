import { combineReducers } from 'redux';

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
