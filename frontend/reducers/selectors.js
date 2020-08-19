import lodashGet from 'lodash/get';
import memoize from 'lodash/memoize';
import { createSelector } from 'reselect';

// Documents
export const getAllDocuments = (state) => state.entities.documents;

// Users
export const getAllUsers = (state) => state.entities.users;

// Errors
export const getErrors = (state) => state.errors;

// Session
/**
 * returns state.session.id
 */
export const getCurrentUser = memoize(
  (state) => state.entities.users[state.session.id],
);
export const signedIn = (state) => !!state.session.id;

//
//
// Reselect selectors
export const getDocumentsAsArray = createSelector(getAllDocuments, (docs) =>
  Object.values(docs),
);

export const getUsersAsArray = createSelector(getAllUsers, (users) =>
  Object.values(users),
);

export const getErrorsAt = (path) =>
  createSelector(getErrors, (errors) => lodashGet(errors, path, []));

export const getUserDetails = (userId) =>
  createSelector([getAllUsers], (users) => users[userId]);

export const getDocumentById = (docId) =>
  createSelector([getAllDocuments], (docs) => docs[docId]);

export const getAssociatedUsers = memoize((docId) =>
  createSelector([getAllDocuments, getAllUsers], (docs, users) => {
    const doc = docs[docId];
    if (doc && doc.editorIds)
      return doc.editorIds.map((userId) => users[userId]);
    return [];
  }),
);
