import {
  FETCH_PLAYING_CONTEXT_SUCCESS,
  PLAY_TRACK_SUCCESS,
  QUEUE_ENDED,
  MUTE_PLAYBACK,
  UNMUTE_PLAYBACK
} from '../constants/ActionTypes';

const initialState = {
  muted: false
};

export default (state, action) => {
  switch (action.type) {
    case FETCH_PLAYING_CONTEXT_SUCCESS:
      return {
        ...state,
        track: action.playingContext.track,
        user: action.playingContext.user,
        position: 0
      };
    case PLAY_TRACK_SUCCESS:
      return {
        ...state,
        track: action.track,
        user: action.user,
        position: action.position,
        startTime: new Date()
      };
    case QUEUE_ENDED: {
      return initialState;
    }
    case MUTE_PLAYBACK:
      return { ...state, muted: true };
    case UNMUTE_PLAYBACK:
      return { ...state, muted: false };
    default:
      return state ? state : initialState;
  }
};
