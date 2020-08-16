import set from 'lodash/set';
import { createSelector } from 'reselect';
import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user';
import { RECEIVE_ALL_DOCUMENTS, RECEIVE_DOCUMENT } from '../actions/document';
import { RECEIVE_CURRENT_USER } from '../actions/session';
// import { getDocumentById } from './documents';

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
        [payload.user.id]: {
          ...payload.user,
        },
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
    default:
      return state;
  }
};

// Selectors
export const getUsers = (state) => state.entities.users;
export const getUserDetails = (userId) =>
  createSelector([getUsers], (users) => users[userId]);
// export const getAssociatedUsers = (docId) =>
// eslint-disable-next-line max-len
//   createSelector([getUsers, getDocumentById(docId)], (users, { editorIds }) => {
//     return editorIds.map((userId) => users[userId]);
//   });
