import { connect } from 'react-redux';
import Avatar from './Avatar';
import { getUserDetails, getCurrentUser } from '../../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  user: getUserDetails(ownProps.userId)(state),
});

const mapDispatchToProps = (_dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
