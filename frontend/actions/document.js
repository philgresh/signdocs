import * as APIUtil from '../utils/document';

export const RECEIVE_ALL_DOCUMENTS = 'RECEIVE_ALL_DOCUMENTS';
export const RECEIVE_DOCUMENT = 'RECEIVE_DOCUMENT';
export const REMOVE_DOCUMENT = 'REMOVE_DOCUMENT';

// Action creators
const receiveDocuments = (documents) => ({
  type: RECEIVE_ALL_DOCUMENTS,
  payload: documents,
});

const receiveDocument = (document) => ({
  type: RECEIVE_DOCUMENT,
  payload: document,
});

const removeDocument = (docId) => ({
  type: REMOVE_DOCUMENT,
  payload: docId,
});

// Thunktions

export const fetchDocuments = () => (dispatch) =>
  APIUtil.fetchDocuments().then((documents) =>
    dispatch(receiveDocuments(documents)),
  );
export const fetchDocument = (docId) => (dispatch) =>
  APIUtil.fetchDocument(docId).then((document) =>
    dispatch(receiveDocument(document)),
  );
export const createDocument = (document) => (dispatch) =>
  APIUtil.createDocument(document).then((doc) =>
    dispatch(receiveDocument(doc)),
  );
export const updateDocument = (document) => (dispatch) =>
  APIUtil.updateDocument(document).then((doc) =>
    dispatch(receiveDocument(doc)),
  );
export const deleteDocument = (docId) => (dispatch) =>
  APIUtil.deleteDocument(docId).then(() => dispatch(removeDocument(docId)));
