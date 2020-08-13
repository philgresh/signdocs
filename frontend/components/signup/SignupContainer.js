import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session';
import Signup from './Signup';

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (formUser) => dispatch(createNewUser(formUser)),
});

export default connect(null, mapDispatchToProps)(Signup);
