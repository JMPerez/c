import fetch from 'isomorphic-unfetch';

import Config from '../config/app';
import * as types from '../constants/ActionTypes';

// playback
export const playTrack = (track, user, position, isUserInitiated) => ({
  type: types.PLAY_TRACK,
  track,
  user,
  position,
  isUserInitiated
});

export const connect = () => ({ type: types.CONNECT });
export const disconnect = () => ({ type: types.DISCONNECT });

export const updateNowPlaying = (track, user, position) => ({
  type: types.UPDATE_NOW_PLAYING,
  track,
  user,
  position
});

export const playTrackSuccess = (track, user, position) => ({
  type: types.PLAY_TRACK_SUCCESS,
  track,
  user,
  position
});

export const connectSuccess = () => ({
  type: types.CONNECT_SUCCESS
});

export const disconnectSuccess = () => ({
  type: types.DISCONNECT_SUCCESS
});

export const fetchPlayingContextSuccess = playingContext => ({
  type: types.FETCH_PLAYING_CONTEXT_SUCCESS,
  playingContext
});

export const fetchPlayingContext = () => dispatch =>
  fetch(`${Config.HOST}/api/now-playing`)
    .then(res => res.json())
    .then(res => dispatch(fetchPlayingContextSuccess(res)));

export const initializeLocalPlayer = () => ({
  type: types.INITIALIZE_LOCAL_PLAYER
});