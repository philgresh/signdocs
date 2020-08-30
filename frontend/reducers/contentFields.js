import merge from 'lodash/merge';
import { RECEIVE_DOCUMENT } from '../actions/document';
import {
  RECEIVE_CONTENT_FIELD,
  REMOVE_CONTENT_FIELD,
  RECEIVE_CONTENT_FIELD_ERROR,
} from '../actions/contentFields';
import { SIGNOUT_CURRENT_USER } from '../actions/session';

const initialState = Object.freeze({
  // a: {
  //   id: 'a',
  //   bbox: {
  //     top: 20,
  //     left: 80,
  //     width: 100,
  //     height: 30,
  //     page: 1,
  //   },
  //   title: 'Drag me around',
  //   docId: '6eaed6a4-6281-4374-9ae7-0bbf7e17de19',
  //   contentableId: '432',
  //   contentableType: 'signatureBlock',
  //   signatory: '444',
  // },
});

const errorsInitialState = Object.freeze({});

const contentFieldErrors = (state = errorsInitialState, { type, payload }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CONTENT_FIELD_ERROR: {
      return payload;
    }
    case RECEIVE_CONTENT_FIELD: {
      return errorsInitialState;
    }
    case SIGNOUT_CURRENT_USER: {
      return errorsInitialState;
    }
    default:
      return state;
  }
};

const contentFieldsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_DOCUMENT:
      return merge(newState, payload.contentFields);
    case RECEIVE_CONTENT_FIELD: {
      const { id } = payload;
      if (action.oldId && newState[id]) {
        const oldCF = newState[id];
        const merged = {
          ...oldCF,
          ...payload,
          bbox: { ...oldCF.bbox, ...payload.bbox },
        };
        return merge(newState, {
          [id]: merged,
        });
      }

      return merge(newState, {
        [id]: payload,
      });
    }
    case REMOVE_CONTENT_FIELD: {
      delete newState[payload];
      return newState;
    }
    case SIGNOUT_CURRENT_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default contentFieldsReducer;
export { contentFieldErrors };
