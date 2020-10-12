import { RECEIVE_SUMMARY } from '../actions/document';
import { SIGNOUT_CURRENT_USER } from '../actions/session';

const initialState = Object.freeze({});

const summaryReducer = (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const newState = { ...state };
  switch (type) {
    case RECEIVE_SUMMARY: {
      return { ...newState, ...payload.summary };
    }
    case SIGNOUT_CURRENT_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default summaryReducer;
