// import produce from 'immer';
import { RECEIVE_DOCUMENT } from '../actions/document';
import {
  RECEIVE_CONTENT_FIELD,
  REMOVE_CONTENT_FIELD,
} from '../actions/contentFields';

const initialState = {
  a: {
    id: 'a',
    bbox: {
      top: 20,
      left: 80,
      width: 100,
      height: 30,
      page: 1,
    },
    title: 'Drag me around',
    docId: '6eaed6a4-6281-4374-9ae7-0bbf7e17de19',
    contentableId: '432',
    contentableType: 'signatureBlock',
    assignee: '444',
  },
};

const contentFieldsReducer = (state = initialState, { type, payload }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_DOCUMENT:
      return { ...state, ...payload.contentFields };
    case RECEIVE_CONTENT_FIELD: {
      const { id } = payload;
      return {
        ...state,
        [id]: {
          ...payload,
        },
      };
    }
    case REMOVE_CONTENT_FIELD: {
      const newState = { ...state };
      delete newState[payload];
      return newState;
    }
    default:
      return state;
  }
};

export default contentFieldsReducer;
