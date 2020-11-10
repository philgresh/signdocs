import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';
import { FIRST_SIGN_IN, SIGNOUT_CURRENT_USER } from '../actions/session';
import { DOC_UPLOAD } from '../actions/document';
import FirstSignin from '../components/session/FirstSignin';
import DocUpload from '../components/document/createEditDoc/DocUpload';
import { Spinner } from '../components/modal';

const initialState = Object.freeze({
  open: false,
});

export default (state = initialState, { type, payload }) => {
  Object.freeze(state);
  const component = payload?.component || Spinner;
  const hasBackground = payload?.hasBackground ?? true;
  switch (type) {
    case CLOSE_MODAL:
      return initialState;
    case OPEN_MODAL:
      return {
        component,
        open: true,
        hasBackground,
      };
    case FIRST_SIGN_IN: {
      return {
        open: true,
        component: FirstSignin,
        props: payload,
      };
    }
    case DOC_UPLOAD: {
      return {
        open: true,
        component: DocUpload,
        props: payload,
      };
    }
    case SIGNOUT_CURRENT_USER: {
      return initialState;
    }
    default:
      return state;
  }
};
