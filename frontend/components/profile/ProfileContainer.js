/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user';
import { fetchSignature, updateSignature } from '../../actions/signature';
import { getCurrentUser, getCurrentUserSig } from '../../reducers/selectors';
import { UserPropTypeShape, SigPropTypeShape } from '../propTypes';
import Profile from './Profile';

class ProfileContainer extends Component {
  componentDidMount() {
    const { fetchMe, user, fetchSig } = this.props;
    fetchMe(user.id).then((u) => {
      fetchSig(u.user.sigId);
    });

    if (user) {
      document.title = `SignDocs - Profile`;
    }
  }

  render() {
    const { user, sig, updateSig, history, fetchMe } = this.props;
    if (
      !user ||
      Object.keys(user).length === 0 ||
      !sig ||
      Object.keys(sig).length === 0
    )
      return <div />;
    return (
      <div className="main-container">
        <Profile
          user={user}
          sig={sig}
          updateSig={updateSig}
          history={history}
          fetchMe={fetchMe}
        />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  user: UserPropTypeShape.isRequired,
  sig: SigPropTypeShape.isRequired,
  fetchMe: PropTypes.func.isRequired,
  fetchSig: PropTypes.func.isRequired,
  updateSig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    go: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: getCurrentUser(state),
    sig: getCurrentUserSig()(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMe: (userId) => dispatch(fetchUser(userId)),
    fetchSig: (sigId) => dispatch(fetchSignature(sigId)),
    updateSig: (sigData) => dispatch(updateSignature(sigData)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileContainer),
);
