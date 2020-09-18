import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionForm from './SessionForm';
import {
  signinUser,
  receiveErrors,
  clearErrors as clrErrors,
} from '../../actions/session';
import { onlySignInFields } from '../../utils/session';

const mapStateToProps = () => ({
  formType: 'SIGN_IN',
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => dispatch(signinUser(onlySignInFields(formUser))),
  receiveErrors: (errs) => dispatch(receiveErrors(errs)),
  clearErrors: () => dispatch(clrErrors()),
});

const SigninFormContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SessionForm),
);

export default SigninFormContainer;
