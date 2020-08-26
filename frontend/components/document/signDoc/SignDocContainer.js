/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PDFContainer from './PDFContainer';
import FieldSideBar from './FieldSideBar';
import { fetchDocument } from '../../../actions/document';
import {
  receiveContentField as receiveCF,
  removeContentField as removeCF,
} from '../../../actions/contentFields';
import {
  getDocumentById,
  getAssociatedUsers,
  getCurrentUser,
  getArrayOfContentFieldsByDocId,
} from '../../../reducers/selectors';
import {
  DocPropTypeShape,
  UserPropTypeShape,
  ContentFieldPropTypeShape,
} from '../../propTypes';

class SignDocContainer extends Component {
  componentDidMount() {
    const { fetchDocument: fetchDoc, doc } = this.props;
    fetchDoc();
    if (doc) {
      document.title = `SignDocs - Sign ${doc.title}`;
    }
  }

  render() {
    if (!this.props.doc || Object.keys(this.props.doc).length === 0)
      return <div />;
    const {
      doc,
      associatedUsers: { editors, owner },
      currentUser,
      contentFields,
      receiveContentField,
      removeContentField,
    } = this.props;
    const newDoc = {
      ...doc,
      editors,
      owner,
      isOwner: owner.id === currentUser.id,
    };
    return (
      <div className="sign-doc-container">
        <div className="pdf-drag-container">
          <DndProvider backend={HTML5Backend}>
            <FieldSideBar />
            <PDFContainer
              doc={newDoc}
              currentUser={currentUser}
              contentFields={contentFields}
              receiveContentField={receiveContentField}
              removeContentField={removeContentField}
            />
          </DndProvider>
        </div>
      </div>
    );
  }
}

SignDocContainer.propTypes = {
  doc: DocPropTypeShape.isRequired,
  associatedUsers: PropTypes.shape({
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }).isRequired,
  fetchDocument: PropTypes.func.isRequired,
  currentUser: UserPropTypeShape.isRequired,
  contentFields: PropTypes.arrayOf(ContentFieldPropTypeShape).isRequired,
  receiveContentField: PropTypes.func.isRequired,
  removeContentField: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    doc: getDocumentById(docId)(state),
    associatedUsers: getAssociatedUsers(docId)(state),
    currentUser: getCurrentUser(state),
    contentFields: getArrayOfContentFieldsByDocId(docId)(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    fetchDocument: () => dispatch(fetchDocument(docId)),
    receiveContentField: (contentField) => dispatch(receiveCF(contentField)),
    removeContentField: (contentFieldId) => dispatch(removeCF(contentFieldId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignDocContainer),
);
