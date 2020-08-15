import {
  RECEIVE_CURRENT_USER,
  SIGNOUT_CURRENT_USER,
  RECEIVE_ERRORS,
} from '../actions/session';

export const sessionErrorsReducer = (state = [], action) => {
  const { type, payload } = action;
  Object.freeze(state);
  switch (type) {
    case RECEIVE_ERRORS: {
      if (payload instanceof Array) return [...payload];
      return [{ error: payload }];
    }
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};

const nullUser = Object.freeze({
  id: null,
});

const sessionReducer = (state = nullUser, { type, payload }) => {
  Object.freeze(state);

  switch (type) {
    case RECEIVE_CURRENT_USER: {
      return { id: payload.user.id };
    }
    case SIGNOUT_CURRENT_USER: {
      return nullUser;
    }
    default:
      return state;
  }
};

// Selectors
export const getCurrentUser = (state) => state.entities.users[state.session.id];
export const signedIn = (state) => !!state.session.id;

export default sessionReducer;
