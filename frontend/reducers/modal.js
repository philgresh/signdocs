import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';

const initialState = Object.freeze({});

export default (state = initialState, { type, payload }) => {
  Object.freeze(state);
  switch (type) {
    case CLOSE_MODAL:
      return initialState;
    case OPEN_MODAL:
      return {
        open: true,
        component: payload.component,
      };
    default:
      return state;
  }
};
