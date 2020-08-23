import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignatureForm from './SignatureForm';
import {
  getCurrentUser,
  getSignatureFromUserId,
} from '../../reducers/selectors';
import {
  fetchSignature as fetchSig,
  updateSignature as updateSig,
} from '../../actions/signature';
import { SigPropTypeShape, UserPropTypeShape } from '../propTypes';

class EditSignature extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchSignature(this.props.userId);
  }

  render() {
    // DO NOT MODIFY THIS FUNCTION
    const { sig, updateSignature } = this.props;

    // Hint: The report will not exist on the first render - what do we need to
    // do to get it?
    if (!sig) return null;

    return <SignatureForm sig={sig} updateSignature={updateSignature} />;
  }
}

EditSignature.propTypes = {
  sig: SigPropTypeShape.isRequired,
  fetchSignature: PropTypes.func.isRequired,
  updateSignature: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps.match.params;
  return {
    userId,
    sig: getSignatureFromUserId(userId)(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignature: (userId) => dispatch(fetchSig(userId)),
    updateSignature: (sigData) => dispatch(updateSig(sigData)),
  };
};

const SignatureContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditSignature),
);

export default SignatureContainer;
