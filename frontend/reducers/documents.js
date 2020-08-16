import set from 'lodash/set';
import unset from 'lodash/unset';
import {
  RECEIVE_ALL_DOCUMENTS,
  RECEIVE_DOCUMENT,
  REMOVE_DOCUMENT,
} from '../actions/document';
import { SIGNOUT_CURRENT_USER } from '../actions/session';

const initialState = Object.freeze({});

export default (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_ALL_DOCUMENTS: {
      return payload.documents;
    }
    case RECEIVE_DOCUMENT: {
      const { document: doc } = payload;
      return set(newState, doc.id, doc);
    }
    case REMOVE_DOCUMENT: {
      const { document: doc } = payload;
      return unset(newState, doc.id);
    }
    case SIGNOUT_CURRENT_USER: {
      return initialState;
    }
    default:
      return state;
  }
};
