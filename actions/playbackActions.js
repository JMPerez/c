import fetch from 'isomorphic-unfetch';

import Config from '../config/app';
import * as types from '../constants/ActionTypes';

// playback
export const playTrack = (track, user, position) => ({
  type: types.PLAY_TRACK,
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

export const mutePlayback = () => ({ type: types.MUTE_PLAYBACK });
export const unmutePlayback = () => ({ type: types.UNMUTE_PLAYBACK });

export const fetchPlayingContextSuccess = playingContext => ({
  type: types.FETCH_PLAYING_CONTEXT_SUCCESS,
  playingContext
});

export const fetchPlayingContext = () => dispatch =>
  fetch(`${Config.HOST}/api/now-playing`)
    .then(res => res.json())
    .then(res => dispatch(fetchPlayingContextSuccess(res)));
