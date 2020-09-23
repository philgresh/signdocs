import merge from 'lodash/merge';
import {
  RECEIVE_ALL_SIGNATURES,
  RECEIVE_SIGNATURE,
  RECEIVE_SIGNATURE_ERROR,
} from '../actions/signature';
import { SIGNOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from '../actions/session';
import { RECEIVE_DOCUMENT } from '../actions/document';

const initialState = Object.freeze({});

const signaturesErrors = (state = initialState, { type, payload }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_SIGNATURE_ERROR:
      return payload;
    case RECEIVE_SIGNATURE:
      return initialState;
    case RECEIVE_ALL_SIGNATURES:
      return initialState;
    case SIGNOUT_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};

const signaturesReducer = (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_CURRENT_USER: {
      const { signature: sig } = payload;
      return merge(newState, { [sig.id]: sig });
    }
    case RECEIVE_ALL_SIGNATURES: {
      return { ...newState, ...payload.signatures };
    }
    case RECEIVE_SIGNATURE: {
      const { signature: sig } = payload;
      // return set(newState, doc.id, doc);
      return merge(newState, { [sig.id]: sig });
    }
    case RECEIVE_DOCUMENT: {
      return { ...newState, ...payload.signatures };
    }
    case SIGNOUT_CURRENT_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default signaturesReducer;
export { signaturesErrors };
