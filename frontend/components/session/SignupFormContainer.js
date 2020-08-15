import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionForm from './SessionForm';
import { getErrors } from '../../reducers/errorsReducer';
import { createNewUser } from '../../actions/session';

const generateBob = () => {
  const now = Math.floor(Date.now() / 1000);

  return {
    email: `bob${now}@example.com`,
    first_name: 'Bob',
    last_name: 'Zhurunkel',
    password: 'password',
  };
};

const mapStateToProps = (state, ownProps) => ({
  errors: getErrors(state),
  formType: 'SIGN_UP',
  generateBob,
  email: ownProps.email,
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => dispatch(createNewUser(formUser)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SessionForm),
);
