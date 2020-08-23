import * as APIUtil from '../utils/signature';

export const RECEIVE_ALL_SIGNATURES = 'RECEIVE_ALL_SIGNATURES';
export const RECEIVE_SIGNATURE = 'RECEIVE_SIGNATURE';
export const RECEIVE_SIGNATURE_ERROR = 'RECEIVE_SIGNATURE_ERROR';

// Action creators
const receiveSignatures = (signatures) => ({
  type: RECEIVE_ALL_SIGNATURES,
  payload: signatures,
});

const receiveSignature = (sig) => ({
  type: RECEIVE_SIGNATURE,
  payload: sig,
});

export const receiveError = (error) => ({
  type: RECEIVE_SIGNATURE_ERROR,
  payload: error,
});

// Thunktions

export const fetchSignatures = () => (dispatch) =>
  APIUtil.fetchSignatures().then((signatures) => {
    dispatch(receiveSignatures(signatures));
    return signatures;
  });

export const fetchSignature = (sigId) => (dispatch) =>
  APIUtil.fetchSignature(sigId)
    .then((sig) => {
      dispatch(receiveSignature(sig));
      return sig;
    })
    .fail((err) => dispatch(receiveError(err)));

export const updateSignature = (sigData) => (dispatch) =>
  APIUtil.updateSignature(sigData).then((sig) => {
    dispatch(receiveSignature(sig));
    return sig;
  });
