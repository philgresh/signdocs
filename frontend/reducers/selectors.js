import lodashGet from 'lodash/get';
import memoize from 'lodash/memoize';
import { createSelector } from 'reselect';

// ContentFields
export const getAllContentFields = (state) => state.entities.contentFields;

// Documents
export const getAllDocuments = (state) => state.entities.documents;

// Users
export const getAllUsers = (state) => state.entities.users;

// Errors
export const getErrors = (state) => state.errors;

// Session
export const getCurrentUser = (state) => state.entities.users[state.session.id];
export const signedIn = (state) => !!state.session.id;

// Signatures
export const getAllSignatures = (state) => state.entities.signatures;

// Modal
export const getModalOpenState = (state) => state.ui.modal.open;
export const getModalState = (state) => state.ui.modal;

// Summary
export const getSummary = (state) => state.entities.summary;

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

export const getSignatories = (docId) =>
  createSelector([getAllDocuments], (docs) => {
    const doc = docs[docId];
    if (!doc) return [];
    return [...doc.editorIds, doc.ownerId];
  });

export const getSignatureById = (sigId) =>
  createSelector([getAllSignatures], (sigs) => {
    return sigs[sigId];
  });

export const getUserBySigId = (sigId) =>
  createSelector([getAllSignatures, getAllUsers], (sigs, users) => {
    const sig = sigs[sigId];
    if (!sig) return null;
    return users[sig.userId];
  });

export const getCurrentUserSig = () =>
  createSelector([getCurrentUser, getAllSignatures], (currUser, sigs) => {
    const { sigId } = currUser;
    return sigs[sigId];
  });

export const getArrayOfContentFieldsByDocId = (docId) =>
  createSelector(
    [getAllContentFields, getAllDocuments],
    (contentFields, docs) => {
      const doc = docs[docId];
      if (!doc) return [];
      const { contentFieldIds } = doc;
      // TODO!!!!
      // const contentFieldIds = ['a'];
      return contentFieldIds.map((id) => contentFields[id]);
    },
  );
