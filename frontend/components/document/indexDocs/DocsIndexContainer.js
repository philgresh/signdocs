/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocsIndex from './DocsIndex';
import Sidebar from './Sidebar';
import { fetchDocuments, deleteDocument } from '../../../actions/document';
import {
  getDocumentsAsArray,
  getCurrentUser,
} from '../../../reducers/selectors';
import { DocPropTypeShape } from '../../propTypes';

class DocsIndexContainer extends Component {
  componentDidMount() {
    const { fetchDocuments: fetchDocs, docs } = this.props;
    fetchDocs();
    if (docs) {
      document.title = `SignDocs - Documents`;
    }
  }

  render() {
    return (
      <div className="index-container">
        <Sidebar />
        <DocsIndex {...this.props} />
      </div>
    );
  }
}

DocsIndexContainer.propTypes = {
  docs: PropTypes.arrayOf(DocPropTypeShape),
  fetchDocuments: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
};

DocsIndexContainer.defaultProps = {
  docs: [],
};

const mapStateToProps = (state) => ({
  docs: getDocumentsAsArray(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
  deleteDocument: (docId) => dispatch(deleteDocument(docId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocsIndexContainer),
);
