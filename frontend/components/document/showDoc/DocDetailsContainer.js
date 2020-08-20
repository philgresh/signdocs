/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocDetails from './DocDetails';
import {
  fetchDocument,
  deleteDocument as delDoc,
} from '../../../actions/document';
import {
  getDocumentById,
  getAssociatedUsers,
  getCurrentUser,
} from '../../../reducers/selectors';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';

class DocDetailsContainer extends Component {
  componentDidMount() {
    const { fetchDocument: fetchDoc } = this.props;
    fetchDoc();
  }

  render() {
    if (!this.props.doc || Object.keys(this.props.doc).length === 0)
      return <div />;
    const {
      doc,
      associatedUsers: { editors, owner },
      currentUser,
      deleteDocument,
    } = this.props;
    const newDoc = {
      ...doc,
      editors,
      owner,
    };
    return (
      <div>
        {newDoc && (
          <DocDetails
            doc={newDoc}
            currentUser={currentUser}
            deleteDocument={deleteDocument}
          />
        )}
      </div>
    );
  }
}

DocDetailsContainer.propTypes = {
  doc: DocPropTypeShape.isRequired,
  associatedUsers: PropTypes.shape({
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }).isRequired,
  fetchDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  currentUser: UserPropTypeShape.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    doc: getDocumentById(docId)(state),
    associatedUsers: getAssociatedUsers(docId)(state),
    currentUser: getCurrentUser(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    fetchDocument: () => dispatch(fetchDocument(docId)),
    deleteDocument: () => dispatch(delDoc(docId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocDetailsContainer),
);
