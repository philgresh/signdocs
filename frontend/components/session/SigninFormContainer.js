import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SessionForm from './SessionForm';
import {getErrors} from '../../reducers/errorsReducer';
import {signinUser} from '../../actions/session';

const mapStateToProps = (state) => ({
  errors: getErrors(state),
  formType: 'login'
})

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => dispatch(signinUser(formUser)),
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SessionForm))