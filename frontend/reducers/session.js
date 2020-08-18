import {
  RECEIVE_CURRENT_USER,
  SIGNOUT_CURRENT_USER,
  RECEIVE_ERRORS,
} from '../actions/session';

export const sessionErrors = (state = {}, action) => {
  const { type, payload } = action;
  Object.freeze(state);
  switch (type) {
    case RECEIVE_ERRORS: {
      let newState = {};
      if (payload instanceof Array) {
        payload.forEach((err, index) => {
          newState[index] = err;
        });
      } else {
        newState = payload;
      }
      return newState;
    }
    case RECEIVE_CURRENT_USER:
      return [];
    case SIGNOUT_CURRENT_USER:
      return [];
    default:
      return state;
  }
};

const nullUser = Object.freeze({
  id: null,
});

export default (state = nullUser, { type, payload }) => {
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
