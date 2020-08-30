import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../reducers/selectors';
import { UserPropTypeShape } from '../propTypes';

const SigRedirect = ({ currentUser: { userId } }) => {
  console.log(currentUser);
  return <Redirect exact from="/signature" to={`/signature/${userId}`} />;
};

SigRedirect.propTypes = {
  currentUser: UserPropTypeShape.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

const SignatureContainer = connect(mapStateToProps)(SigRedirect);

export default SignatureContainer;
