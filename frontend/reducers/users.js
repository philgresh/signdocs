import set from 'lodash/set';
import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user';
import { RECEIVE_ALL_DOCUMENTS, RECEIVE_DOCUMENT } from '../actions/document';
import { RECEIVE_CURRENT_USER, SIGNOUT_CURRENT_USER } from '../actions/session';

const initialState = Object.freeze({});
export default (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_USERS: {
      return { ...newState, ...payload.users };
    }
    case RECEIVE_USER: {
      const userId = payload.user.id;
      const newUser = {
        ...payload.user,
      };
      return set(newState, userId, newUser);
    }
    case RECEIVE_CURRENT_USER: {
      const userId = payload.user.id;
      const newUser = {
        ...payload.user,
      };
      return set(newState, userId, newUser);
    }
    case RECEIVE_ALL_DOCUMENTS: {
      return { ...newState, ...payload.users };
    }
    case RECEIVE_DOCUMENT: {
      return { ...newState, ...payload.users };
    }
    case SIGNOUT_CURRENT_USER: {
      return initialState;
    }
    default:
      return state;
  }
};
