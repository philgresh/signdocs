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
      const { document: doc } = payload;
      return set(newState, doc.id, doc);
    }
    case REMOVE_DOCUMENT: {
      const { document: doc } = payload;
      return unset(newState, doc.id);
    }
    default:
      return state;
  }
};

// Selectors
const getAllDocuments = (state) => state.entities.documents;

export const getDocumentById = (docId) =>
  createSelector([getAllDocuments], (docs) => docs[docId]);

export const getDocumentsAsArray = createSelector(getAllDocuments, (docs) =>
  Object.values(docs),
);

// export const getFullDocumentDetails = (docId) =>
//   createSelector([getAllDocuments, getUsers], (docs, users) => {
//     const doc = docs[docId];
//     const editors = filter(Object.values(users), (user) =>
//       doc.editorIds.includes(user.id),
//     );
//     doc.editors = editors;
//     return doc;
//   });
