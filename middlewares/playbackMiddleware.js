import fetch from 'isomorphic-unfetch';

import { PLAY_TRACK, CONNECT, DISCONNECT } from '../constants/ActionTypes';
import { playTrack, playTrackSuccess, connectSuccess, disconnectSuccess } from '../actions/playbackActions';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

const PlaybackMiddleware = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case PLAY_TRACK: {
      if (process.browser && !store.getState().playback.muted) {
        fetch(`${SPOTIFY_API_BASE}/me/player/play`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${store.getState().session.access_token}`
          },
          body: JSON.stringify({
            uris: [`spotify:track:${action.track.id}`]
          })
        }).then(() => {
          if (action.position) {
            fetch(`${SPOTIFY_API_BASE}/me/player/seek?position_ms=${action.position}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${store.getState().session.access_token}`
              }
            }).then(() => {
              store.dispatch(playTrackSuccess(action.track, action.user, action.position));
            });
          } else {
            store.dispatch(playTrackSuccess(action.track, action.user));
          }
          if (action.isUserInitiated) {
            store.dispatch(connectSuccess());
          }
        });
      }
      break;
    }
    case CONNECT: {
      const { track, user, position, startTime } = store.getState().playback;
      const currentPosition = Date.now() - startTime + position;
      if (isNaN(currentPosition)) {
        console.error('PlaybackMiddleware: Current Position is NaN');
      }
      store.dispatch(playTrack(track, user, currentPosition, true));
      break;
    }

    case DISCONNECT: {
      if (process.browser && !store.getState().playback.muted) {
        fetch(`${SPOTIFY_API_BASE}/me/player/pause`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${store.getState().session.access_token}`
          }
        }).then(() => {
        store.dispatch(disconnectSuccess());
        });
      }
    }
      break;
    default:
      break;
  }

  return result;
};

export default PlaybackMiddleware;