import merge from 'lodash/merge';
import unset from 'lodash/unset';
import {
  RECEIVE_ALL_DOCUMENTS,
  RECEIVE_DOCUMENT,
  REMOVE_DOCUMENT,
  RECEIVE_DOCUMENT_ERROR,
} from '../actions/document';
import { SIGNOUT_CURRENT_USER } from '../actions/session';

const initialState = Object.freeze({});

const documentsErrors = (state = initialState, { type, payload }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_DOCUMENT_ERROR:
      return payload;
    case RECEIVE_DOCUMENT:
      return initialState;
    case RECEIVE_ALL_DOCUMENTS:
      return initialState;
    case SIGNOUT_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};

const documentsReducer = (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_ALL_DOCUMENTS: {
      // return { ...newState, ...payload.documents };
      if (payload.documents) return payload.documents;
      return state;
    }
    case RECEIVE_DOCUMENT: {
      const { document: doc } = payload;
      // return set(newState, doc.id, doc);
      return merge(newState, { [doc.id]: doc });
    }
    case REMOVE_DOCUMENT: {
      const { docId } = payload;
      return unset(newState, docId);
    }
    case SIGNOUT_CURRENT_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default documentsReducer;
export { documentsErrors };
