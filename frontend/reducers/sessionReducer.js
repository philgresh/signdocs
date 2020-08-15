import {
  RECEIVE_CURRENT_USER,
  SIGNOUT_CURRENT_USER,
  RECEIVE_ERRORS,
} from '../actions/session';

export const sessionInitialState = {
  currentUser: null,
};

const sessionErrorsInitialState = []

export const sessionErrorsReducer = (state = sessionErrorsInitialState, {type, payload}) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_ERRORS:
      return [...payload.responseJSON];
    case RECEIVE_CURRENT_USER:
      return sessionErrorsInitialState;
    default:
      return state;
  }
};

// Selectors
export const getCurrentUser = (state) => state.session.currentUser;
export const signedIn = (state) => !!state.session.currentUser;

export default (state = sessionInitialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      return Object.assign({}, { currentUser: action.payload });
    }
    case SIGNOUT_CURRENT_USER: {
      return sessionInitialState;
    }
    default:
      return state;
  }
};
