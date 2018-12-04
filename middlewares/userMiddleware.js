import { SELECT_RADIO_MASTER } from '../constants/ActionTypes';
import { selectRadioMaster } from '../actions/usersActions';
import { fetchAvailableDevicesError, fetchAvailableDevicesSuccess } from '../actions/devicesActions';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export default store => next => action => {
  const result = next(action);
  switch (action.type) {
    case SELECT_RADIO_MASTER: {
      socket.emit('queue track', trackId);

      fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`
        }
      })
        .then(r => r.json())
        .then(r => {
          if (r.error) {
            console.log(r.error);
          } else {
            // console.log(r);
          }
        });
      break;
    }
  }
};
