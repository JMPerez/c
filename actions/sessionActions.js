import * as types from '../constants/ActionTypes';

export const load = () => ({ type: types.LOAD });
export const login = () => ({ type: types.LOGIN });
export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
});
export const loginFailure = refresh_token => ({
  type: types.LOGIN_FAILURE,
  refresh_token
});
export const updateToken = refreshToken => ({
  type: types.UPDATE_TOKEN,
  refreshToken
});
export const updateTokenSuccess = access_token => ({
  type: types.UPDATE_TOKEN_SUCCESS,
  access_token
});
export const updateCurrentUser = user => ({
  type: types.UPDATE_CURRENT_USER,
  user
});
