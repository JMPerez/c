import fetch from 'isomorphic-unfetch';

import { SEARCH_TRACKS } from '../constants/ActionTypes';
import { searchTracksSuccess } from '../actions/searchActions';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

const searchTracks = query => (dispatch, getState) => {
  let shouldAddWildcard = false;
  if (query.length > 1) {
    const words = query.split(' ');
    const lastWord = words[words.length - 1];
    if (/^[a-z0-9\s]+$/i.test(lastWord) && query.lastIndexOf('*') !== query.length - 1) {
      shouldAddWildcard = true;
    }
  }

  const wildcardQuery = `${query}${shouldAddWildcard ? '*' : ''}`; // Trick to improve search results

  return fetch(`${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(wildcardQuery)}&type=track&limit=10`, {
    headers: {
      Authorization: 'Bearer ' + getState().session.access_token
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(searchTracksSuccess(query, res.tracks.items));
    });
};

export default store => next => action => {
  const result = next(action);
  switch (action.type) {
    case SEARCH_TRACKS: {
      return store.dispatch(searchTracks(action.query));
      break;
    }
    default:
      break;
  }
  return result;
};
