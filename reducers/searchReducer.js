import { SEARCH_TRACKS, SEARCH_TRACKS_SUCCESS, SEARCH_TRACKS_RESET } from '../constants/ActionTypes';

const initialState = {};

export default (state, action) => {
  switch (action.type) {
    case SEARCH_TRACKS:
      return { query: action.query };
    case SEARCH_TRACKS_SUCCESS:
      if (state.query === action.query) {
        return {
          query: action.query,
          results: action.results
        };
      } else {
        return state;
      }
    case SEARCH_TRACKS_RESET:
      return initialState;

    default:
      return state ? state : initialState;
  }
};
