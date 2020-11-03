import fetch from "isomorphic-unfetch";

import {
  PLAY_TRACK,
  CONNECT,
  DISCONNECT,
  INITIALIZE_LOCAL_PLAYER,
} from "../constants/ActionTypes";
import {
  playTrack,
  playTrackSuccess,
  connectSuccess,
  disconnectSuccess,
} from "../actions/playbackActions";
import { transferPlaybackToDevice } from "../actions/devicesActions";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const PlaybackMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  switch (action.type) {
    case PLAY_TRACK: {
      if (process.browser && !store.getState().playback.muted) {
        fetch(`${SPOTIFY_API_BASE}/me/player/play`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${store.getState().session.access_token}`,
          },
          body: JSON.stringify({
            uris: [`spotify:track:${action.track.id}`],
            position_ms: action.position ?? 0,
          }),
        }).then(() => {
          store.dispatch(playTrackSuccess(action.track, action.user));
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
        console.error("PlaybackMiddleware: Current Position is NaN");
      }
      store.dispatch(playTrack(track, user, currentPosition, true));
      break;
    }

    case DISCONNECT: {
      if (process.browser && !store.getState().playback.muted) {
        fetch(`${SPOTIFY_API_BASE}/me/player/pause`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${store.getState().session.access_token}`,
          },
        }).then(() => {
          store.dispatch(disconnectSuccess());
        });
      }
      break;
    }
    case INITIALIZE_LOCAL_PLAYER: {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = store.getState().session.access_token;
        const player = new Spotify.Player({
          name: "C - Collaborative",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        // Error handling
        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener("player_state_changed", (state) => {
          console.log(state);
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          store.dispatch(transferPlaybackToDevice(device_id));
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        player.connect();
      };

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.asyc = true;
      document.body.appendChild(script);
      break;
    }
    default:
      break;
  }

  return result;
};

export default PlaybackMiddleware;
