import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionForm from './SessionForm';
import { createNewUser, receiveErrors } from '../../actions/session';

const generateBob = () => {
  const now = Math.floor(Date.now() / 1000);

  return {
    email: `bob${now}@example.com`,
    firstName: 'Bob',
    lastName: 'Zhurunkel',
    password: 'password',
  };
};

const mapStateToProps = (_state, ownProps) => ({
  formType: 'SIGN_UP',
  email: ownProps.email,
  generateBob,
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => dispatch(createNewUser(formUser)),
  receiveErrors: (errs) => dispatch(receiveErrors(errs)),
});

const SignupFormContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SessionForm),
);

export default SignupFormContainer;
