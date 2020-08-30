import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';
import { FIRST_SIGN_IN } from '../actions/session';
import FirstSignin from '../components/session/FirstSignin';

const initialState = Object.freeze({
  open: false,
});

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
    case FIRST_SIGN_IN: {
      return {
        open: true,
        component: FirstSignin,
        props: payload,
      };
    }
    default:
      return state;
  }
};
