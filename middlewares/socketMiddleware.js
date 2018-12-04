import { VOTE_UP, LOGIN_SUCCESS, QUEUE_REMOVE_TRACK, QUEUE_TRACK, SELECT_RADIO_MASTER } from '../constants/ActionTypes';
import { updateUsers } from '../actions/usersActions';
import { updateQueue, queueEnded } from '../actions/queueActions';
import { updateNowPlaying, playTrack, fetchPlayingContextSuccess } from '../actions/playbackActions';
import Config from '../config/app';
import fetch from 'isomorphic-unfetch';

import io from 'socket.io-client';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

let socket = null;

const getIdFromTrackString = (trackString = '') => {
  let matches = trackString.match(/^https:\/\/open\.spotify\.com\/track\/(.*)/);
  if (matches) {
    return matches[1];
  }

  matches = trackString.match(/^https:\/\/play\.spotify\.com\/track\/(.*)/);
  if (matches) {
    return matches[1];
  }

  matches = trackString.match(/^spotify:track:(.*)/);
  if (matches) {
    return matches[1];
  }

  return null;
};

export function socketMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (socket) {
      switch (action.type) {
        case QUEUE_TRACK: {
          let trackId = getIdFromTrackString(action.id);
          if (trackId === null) {
            trackId = action.id;
          }
          socket.emit('queue track', trackId);
          break;
        }
        case QUEUE_REMOVE_TRACK: {
          socket.emit('remove track', action.id);
          break;
        }
        case LOGIN_SUCCESS:
          const user = store.getState().session.user;
          socket.emit('user login', user);
          break;
        case VOTE_UP:
          socket.emit('vote up', action.id);
          break;
        case SELECT_RADIO_MASTER:
          socket.emit('change radio master', action.userId);
          break;
        default:
          break;
      }
    }

    return result;
  };
}
export default function(store) {
  socket = io.connect(Config.HOST);

  socket.on('update queue', data => {
    store.dispatch(updateQueue(data));
  });

  socket.on('queue ended', () => {
    store.dispatch(queueEnded());
  });

  socket.on('update now playing', (track, user, isPlaying) => {
    // we should also set repeat to false!
    store.dispatch(updateNowPlaying(track, user, isPlaying));
  });

  socket.on('play track', (track, user, position) => {
    // we should also set repeat to false!
    if (store.getState().session.user && store.getState().session.user.id !== user.id) {
      store.dispatch(playTrack(track, user, position));
    } else {
      store.dispatch(fetchPlayingContextSuccess({ track: track, user: user, position: position }));
    }
  });

  socket.on('update users', data => {
    store.dispatch(updateUsers(data));
  });

  socket.on('fetch radio master track', radioMasterId => {
    if (store.getState().session.user && store.getState().session.user.id === radioMasterId) {
      console.log('fetch radio master track ' + radioMasterId);
      fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${store.getState().session.access_token}` }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            console.log(r.error);
          } else {
            fetch(`${Config.HOST}/api/radio-master-track`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                track: r.item,
                user: store.getState().session.user,
                progress_ms: r.progress_ms
              })
            });
          }
        });
    }
  });

  // todo: manage end song, end queue
}
