/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignatureForm from './SignatureForm';
import {
  getUserBySigId,
  getSignatureById,
  getUserDetails,
} from '../../reducers/selectors';
import {
  fetchSignature as fetchSig,
  updateSignature as updateSig,
} from '../../actions/signature';
import { fetchUser as fetchMe } from '../../actions/user';
import { SigPropTypeShape, UserPropTypeShape } from '../propTypes';

class EditSignature extends Component {
  componentDidMount() {
    this.props.fetchSignature(this.props.sigId);
    this.props.fetchUser(this.props.sigId);
  }

  render() {
    const { sig, updateSignature, user } = this.props;
    if (!sig && !user) return null;

    return (
      <SignatureForm sig={sig} updateSignature={updateSignature} user={user} />
    );
  }
}

EditSignature.propTypes = {
  sig: SigPropTypeShape.isRequired,
  fetchSignature: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  updateSignature: PropTypes.func.isRequired,
  user: UserPropTypeShape.isRequired,
  sigId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { sigId } = ownProps.match.params;
  return {
    sigId,
    user: getUserBySigId(sigId)(state),
    sig: getSignatureById(sigId)(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignature: (userId) => dispatch(fetchSig(userId)),
    updateSignature: (sigData) => dispatch(updateSig(sigData)),
    fetchUser: (userId) => dispatch(fetchMe(userId)),
  };
};

const SignatureContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditSignature),
);

export default SignatureContainer;
