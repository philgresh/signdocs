/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import Splash from '../splash';
import { fetchDocuments } from '../../actions/document';
import { getCurrentUser } from '../../reducers/selectors';

const HomeContainer = (props) => {
  if (!props.currentUser) return <Splash />;
  return <Home {...props} />;
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
