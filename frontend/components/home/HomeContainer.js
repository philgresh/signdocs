/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import Splash from '../splash';
import { fetchDocuments } from '../../actions/document';
import { getCurrentUser } from '../../reducers/selectors';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.fetchDocuments();
  }

  render() {
    if (!this.props.currentUser) return <Splash />;
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { props } = this;
    return <Home {...props} />;
  }
}

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
