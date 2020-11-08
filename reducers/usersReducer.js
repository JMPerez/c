import { UPDATE_USERS } from "../constants/ActionTypes";
import { HYDRATE } from "next-redux-wrapper";
const initialState = [];

const UsersReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.users;
    case UPDATE_USERS:
      return action.data;
    default:
      return state ? state : initialState;
  }
};

export default UsersReducer;
