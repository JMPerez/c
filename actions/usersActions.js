import fetch from 'isomorphic-unfetch';

import Config from '../config/app';
import * as types from '../constants/ActionTypes';

export const updateUsers = users => ({ type: types.UPDATE_USERS, data: users });

export const fetchUsers = () => dispatch =>
  fetch(`${Config.HOST}/api/users`)
    .then(res => res.json())
    .then(res => dispatch(updateUsers(res)));

export const selectRadioMaster = userId => ({
  type: types.SELECT_RADIO_MASTER,
  userId
});
