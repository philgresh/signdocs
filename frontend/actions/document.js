import * as APIUtil from '../utils/document';

export const RECEIVE_ALL_DOCUMENTS = 'RECEIVE_ALL_DOCUMENTS';
export const RECEIVE_DOCUMENT = 'RECEIVE_DOCUMENT';
export const REMOVE_DOCUMENT = 'REMOVE_DOCUMENT';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

// Action creators
const receiveDocuments = (docs) => ({
  type: RECEIVE_ALL_DOCUMENTS,
  payload: docs,
});

const receiveDocument = (doc) => ({
  type: RECEIVE_DOCUMENT,
  payload: doc,
});

const removeDocument = (docId) => ({
  type: REMOVE_DOCUMENT,
  payload: docId,
});

const receiveError = (error) => ({
  type: RECEIVE_ERROR,
  payload: error,
});

// Thunktions

export const fetchDocuments = () => (dispatch) =>
  APIUtil.fetchDocuments().then((docs) => dispatch(receiveDocuments(docs)));
export const fetchDocument = (docId) => (dispatch) =>
  APIUtil.fetchDocument(docId).then((doc) => dispatch(receiveDocument(doc)));
export const createDocument = (docForm) => (dispatch) =>
  APIUtil.createDocument(docForm)
    .then((doc) => {
      dispatch(receiveDocument(doc));
      return doc;
    })
    .fail((err) => {
      receiveError(err);
      return err;
    });

export const updateDocument = (docForm) => (dispatch) =>
  APIUtil.updateDocument(docForm).then((doc) => dispatch(receiveDocument(doc)));
export const deleteDocument = (docId) => (dispatch) =>
  APIUtil.deleteDocument(docId).then(() => dispatch(removeDocument(docId)));
