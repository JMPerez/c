import {
  CONNECT_SUCCESS,
  DISCONNECT_SUCCESS,
  FETCH_PLAYING_CONTEXT_SUCCESS,
  PLAY_TRACK_SUCCESS,
  QUEUE_ENDED,
  UPDATE_NOW_PLAYING,
} from "../constants/ActionTypes";

const initialState = {
  muted: false,
};

const PlaybackReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PLAYING_CONTEXT_SUCCESS:
      return {
        ...state,
        track: action.playingContext.track,
        user: action.playingContext.user,
        startTimestamp: action.playingContext.startTimestamp,
      };
    case PLAY_TRACK_SUCCESS:
      return {
        ...state,
        track: action.track,
        user: action.user,
        startTimestamp: new Date() - action.position,
      };
    case CONNECT_SUCCESS:
      return { ...state, isConnectedToPlayback: true };
    case DISCONNECT_SUCCESS:
      return {
        ...state,
        isConnectedToPlayback: false,
      };
    case UPDATE_NOW_PLAYING:
      return {
        ...state,
        track: action.track,
        user: action.user,
      };
    case QUEUE_ENDED: {
      return initialState;
    }

    default:
      return state ? state : initialState;
  }
};

export default PlaybackReducer;
