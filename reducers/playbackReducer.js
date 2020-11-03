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
        position: 0,
      };
    case PLAY_TRACK_SUCCESS:
      return {
        ...state,
        track: action.track,
        user: action.user,
        position: action.position,
        startTime: new Date(),
        isPlaying: true,
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
        position: action.position,
        startTime: new Date(),
      };
    case QUEUE_ENDED: {
      return initialState;
    }

    default:
      return state ? state : initialState;
  }
};

export default PlaybackReducer;
