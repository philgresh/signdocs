import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionForm from './SessionForm';
import { getErrors } from '../../reducers/errorsReducer';
import { signinUser } from '../../actions/session';
import { onlySignInFields } from '../../utils/sessionUtils';

const mapStateToProps = (state) => ({
  errors: getErrors(state),
  formType: 'SIGN_IN',
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => dispatch(signinUser(onlySignInFields(formUser))),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SessionForm),
);
