import { UPDATE_USERS } from '../constants/ActionTypes';

const initialState = [
  {
    id: 'something',
    name: 'Adrian'
  },
  {
    id: 'something',
    name: 'Bea'
  },
  {
    id: 'something',
    name: 'Carlos'
  }
];

export default (state, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return action.data;
    default:
      return state ? state : initialState;
  }
};
