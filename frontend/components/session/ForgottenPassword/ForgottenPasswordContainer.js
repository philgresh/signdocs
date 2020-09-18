import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  receiveErrors,
  forgottenPassword,
  clearErrors,
} from '../../../actions/session';
import ForgottenPassword from './ForgottenPassword';

const mapDispatchToProps = (dispatch) => ({
  sendForgottenPasswordEmail: (email) => dispatch(forgottenPassword(email)),
  receiveErrors: (errs) => dispatch(receiveErrors(errs)),
  clearOutErrors: (errs) => dispatch(clearErrors(errs)),
});

const ForgottenPasswordContainer = withRouter(
  connect(null, mapDispatchToProps)(ForgottenPassword),
);

export default ForgottenPasswordContainer;
