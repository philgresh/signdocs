import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SessionForm from './SessionForm';
import {getErrors} from '../../reducers/errorsReducer';
import {createNewUser} from '../../actions/session';

const mapStateToProps = (state) => ({
  errors: getErrors(state),
  formType: 'signup'
})

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => dispatch(createNewUser(formUser)),
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SessionForm))