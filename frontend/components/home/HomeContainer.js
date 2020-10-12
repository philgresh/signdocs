/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import Splash from '../splash';
import { fetchDocuments, fetchSummary } from '../../actions/document';
import { fetchSignature } from '../../actions/signature';
import { getCurrentUser } from '../../reducers/selectors';

const HomeContainer = (props) => {
  document.title = `SignDocs - Share and Sign Documents`;
  if (!props.currentUser) return <Splash />;
  return <Home {...props} />;
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
  fetchSignature: (sigId) => dispatch(fetchSignature(sigId)),
  fetchSummary: () => dispatch(fetchSummary()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
