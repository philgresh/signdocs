import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  receiveErrors,
  resetPassword,
  clearErrors,
} from '../../../actions/session';
import ResetPassword from './ResetPassword';

const mapStateToProps = (_state, ownProps) => ({
  resetToken: ownProps.match.params.resetToken,
});

const mapDispatchToProps = (dispatch) => ({
  submitResetPassword: (email) => dispatch(resetPassword(email)),
  receiveErrors: (errs) => dispatch(receiveErrors(errs)),
  clearOutErrors: (errs) => dispatch(clearErrors(errs)),
});

const ForgottenPasswordContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassword),
);

export default ForgottenPasswordContainer;
