import { LOAD, LOGIN_SUCCESS, UPDATE_TOKEN_SUCCESS, UPDATE_CURRENT_USER } from '../constants/ActionTypes';

const initialState = {
  refresh_token: null, //'localStorage' in window && localStorage.getItem('refreshToken'),
  user: null
};

const SessionReducer = (state, action) => {
  switch (action.type) {
    case LOAD:
      if (process.browser) {
        const refreshToken = localStorage.getItem('v2_refreshToken');
        const accessToken = localStorage.getItem('v2_accessToken');
        const expiresIn = localStorage.getItem('v2_expiresIn');
        return Object.assign({}, state, {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn ? +expiresIn : null
        });
      } else {
        return state;
      }
    case UPDATE_TOKEN_SUCCESS:
      return Object.assign({}, state, { access_token: action.access_token });
    case LOGIN_SUCCESS:
      if (action.refresh_token) {
        return Object.assign({}, state, {
          refresh_token: action.refresh_token
        });
      }
      return state;
    case UPDATE_CURRENT_USER:
      return Object.assign({}, state, { user: action.user });
    default:
      return state ? state : initialState;
  }
};

export default SessionReducer;