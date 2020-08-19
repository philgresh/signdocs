import {
  RECEIVE_CURRENT_USER,
  SIGNOUT_CURRENT_USER,
  RECEIVE_SESSION_ERROR,
} from '../actions/session';

export const sessionErrors = (state = {}, { type, payload }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_SESSION_ERROR: {
      return payload;
    }
    case RECEIVE_CURRENT_USER:
      return {};
    case SIGNOUT_CURRENT_USER:
      return {};
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
