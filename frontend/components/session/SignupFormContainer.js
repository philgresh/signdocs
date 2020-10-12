import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { name, internet } from 'faker';
import SessionForm from './SessionForm';
import {
  createNewUser,
  receiveErrors,
  clearErrors as clrErrors,
} from '../../actions/session';

const generateDemo = () => {
  const firstName = name.firstName();
  const lastName = name.lastName();
  const email = internet.email(firstName, lastName, 'example.org');

  return {
    email,
    firstName,
    lastName,
    password: 'password',
  };
};

const mapStateToProps = (_state, ownProps) => ({
  formType: 'SIGN_UP',
  email: ownProps.email,
  generateDemo,
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => dispatch(createNewUser(formUser)),
  receiveErrors: (errs) => dispatch(receiveErrors(errs)),
  clearErrors: () => dispatch(clrErrors()),
});

const SignupFormContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SessionForm),
);

export default SignupFormContainer;
