import { connect } from 'react-redux';
import Navbar from './Navbar';
import { signoutUser } from '../../actions/session';
import { getCurrentUser } from '../../reducers/session';

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
