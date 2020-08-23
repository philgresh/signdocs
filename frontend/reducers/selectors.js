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
export const getCurrentUser = memoize(
  (state) => state.entities.users[state.session.id],
);
export const signedIn = (state) => !!state.session.id;

// Signatures
export const getAllSignatures = (state) => state.entities.signatures;

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
    const associatedUsers = { editors: [], owner: null };
    if (doc && doc.editorIds)
      doc.editorIds.forEach((userId) =>
        associatedUsers.editors.push(users[userId]),
      );
    if (doc && doc.ownerId) associatedUsers.owner = users[doc.ownerId];
    return associatedUsers;
  }),
);

export const getSignatureFromUserId = (userId) =>
  createSelector([getAllSignatures], (sigs) => {
    return sigs[userId];
  });
