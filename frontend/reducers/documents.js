import set from 'lodash/set';
import unset from 'lodash/unset';
import { createSelector } from 'reselect';
import {
  RECEIVE_ALL_DOCUMENTS,
  RECEIVE_DOCUMENT,
  REMOVE_DOCUMENT,
} from '../actions/document';

const initialState = Object.freeze({});

export default (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_ALL_DOCUMENTS: {
      return payload.documents;
    }
    case RECEIVE_DOCUMENT: {
      const { document } = payload;
      const newDoc = {
        [document.id]: { ...document },
      };
      return set(newState, document.id, newDoc);
    }
    case REMOVE_DOCUMENT: {
      const { document } = payload;
      return unset(newState, document.id);
    }
    default:
      return state;
  }
};

// Selectors
const getAllDocuments = (state) => state.entities.documents;
export const getDocument = (docId, state) => state.entities.documents[docId];
export const getDocuments = createSelector(getAllDocuments, (docs) =>
  Object.values(docs),
);
