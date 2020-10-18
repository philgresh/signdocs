import * as APIUtil from '../utils/document';
import { Spinner } from '../components/modal';
import { receiveModal, closeModal } from './modal';

export const RECEIVE_ALL_DOCUMENTS = 'RECEIVE_ALL_DOCUMENTS';
export const RECEIVE_DOCUMENT = 'RECEIVE_DOCUMENT';
export const REMOVE_DOCUMENT = 'REMOVE_DOCUMENT';
export const RECEIVE_DOCUMENT_ERROR = 'RECEIVE_DOCUMENT_ERROR';
export const DOC_UPLOAD = 'DOC_UPLOAD';
export const RECEIVE_SUMMARY = 'RECEIVE_SUMMARY';

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

export const receiveError = (error) => ({
  type: RECEIVE_DOCUMENT_ERROR,
  payload: error,
});

export const receiveDocUpload = (doc) => ({
  type: DOC_UPLOAD,
  payload: { doc: doc.document },
});

export const receiveSummary = (payload) => ({
  type: RECEIVE_SUMMARY,
  payload,
});

// Thunktions

export const fetchDocuments = () => (dispatch) =>
  APIUtil.fetchDocuments().then((docs) => {
    dispatch(receiveDocuments(docs));
    return docs;
  });

export const fetchDocument = (docId) => (dispatch) =>
  APIUtil.fetchDocument(docId)
    .then((doc) => {
      dispatch(receiveDocument(doc));
      return doc;
    })
    .fail((err) => dispatch(receiveError(err)));

export const createDocument = (docForm) => (dispatch) =>
  APIUtil.createDocument(docForm)
    .then((doc) => {
      dispatch(receiveDocument(doc));
      dispatch(receiveDocUpload(doc));
      return doc;
    })
    .fail((err) => dispatch(receiveError(err.responseJSON)));

export const updateDocument = (docId, docForm) => (dispatch) =>
  APIUtil.updateDocument(docId, docForm).then((doc) => {
    dispatch(receiveDocument(doc));
    return doc;
  });

export const deleteDocument = (docId) => (dispatch) =>
  APIUtil.deleteDocument(docId)
    .then((res) => {
      dispatch(removeDocument(docId));
      return res;
    })
    .fail((err) => {
      dispatch(receiveError(err.responseJSON));
      return err;
    });

export const fetchSignedUrl = (docId) => (dispatch) =>
  APIUtil.fetchSignedUrl(docId).then((res) => {
    dispatch(receiveDocument(res));
    return res;
  });

export const finalizeDocument = (docId) => (dispatch) => {
  dispatch(receiveModal(Spinner, false));
  return APIUtil.finalizeDocument(docId).then((res) => {
    dispatch(receiveDocument(res));
    dispatch(closeModal());
    return res;
  });
};

export const fetchSummary = () => (dispatch) =>
  APIUtil.getSummary().then((res) => {
    dispatch(receiveSummary(res));
    return res;
  });
