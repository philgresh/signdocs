/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocsIndex from './DocsIndex';
import { fetchDocuments, deleteDocument } from '../../../actions/document';
import {
  getDocumentsAsArray,
  getCurrentUser,
} from '../../../reducers/selectors';
import { DocPropTypeShape } from '../../propTypes';

class DocsIndexContainer extends Component {
  componentDidMount() {
    const { fetchDocuments: fetchDocs } = this.props;
    fetchDocs();
  }

  render() {
    return (
      <div>
        <DocsIndex {...this.props} />
      </div>
    );
  }
}

DocsIndexContainer.propTypes = {
  documents: PropTypes.arrayOf(DocPropTypeShape),
  fetchDocuments: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
};

DocsIndexContainer.defaultProps = {
  documents: [],
};

const mapStateToProps = (state) => ({
  documents: getDocumentsAsArray(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
  deleteDocument: (docId) => dispatch(deleteDocument(docId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocsIndexContainer),
);
