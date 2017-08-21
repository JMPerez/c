import { UPDATE_QUEUE } from '../constants/ActionTypes';

const initialState = [];

export default (state, action) => {
  switch (action.type) {
    case UPDATE_QUEUE:
      return action.data;
    default:
      return state ? state : initialState;
  }
};
