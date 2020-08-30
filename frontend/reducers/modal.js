import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';
import { FIRST_SIGN_IN } from '../actions/session';
import { DOC_UPLOAD } from '../actions/document';
import FirstSignin from '../components/session/FirstSignin';
import DocUpload from '../components/document/createEditDoc/DocUpload';

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
    case DOC_UPLOAD: {
      return {
        open: true,
        component: DocUpload,
        props: payload,
      };
    }
    default:
      return state;
  }
};
