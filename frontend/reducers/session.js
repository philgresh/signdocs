import { RECEIVE_CURRENT_USER, SIGNOUT_CURRENT_USER } from '../actions/session';

export const sessionInitialState = {
  currentUser: null,
};

const sessionReducer = (state = sessionInitialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      return Object.assign({}, { currentUser: action.user });
    }
    case SIGNOUT_CURRENT_USER: {
      return sessionInitialState;
    }
    default:
      return state;
  }
};

// Selectors
export const getCurrentUser = (state) => state.session.currentUser;
export const signedIn = (state) => !!state.session.currentUser;

export default sessionReducer;
