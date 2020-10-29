import { UPDATE_QUEUE } from '../constants/ActionTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = [];

export default (state, action) => {
  switch (action.type) {
    case HYDRATE: 
      return action.payload.queue;
    case UPDATE_QUEUE:
      return action.data;
    default:
      return state ? state : initialState;
  }
};
