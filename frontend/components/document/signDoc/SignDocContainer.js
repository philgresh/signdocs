/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Signatories from '../shared/Signatories';
import SignPDF from './SignPDF';
import { DocPropTypeShape } from '../../propTypes';

import { fetchDocument } from '../../../actions/document';
import {
  getDocumentById,
  getSignatories,
  getCurrentUser,
} from '../../../reducers/selectors';

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

    const { doc, signatories } = this.props;
    return (
      <div className="sign-doc-container">
        <h2>Sign your document</h2>
        <div className="pdf-drag-container">
          <DndProvider backend={HTML5Backend}>
            <div className="side-bar">
              <Signatories
                signatories={signatories}
                onChangeSignatory={this.onChangeSignatory}
              />
            </div>
            {doc && doc.fileUrl && (
              <SignPDF doc={doc} signatories={signatories} />
            )}
          </DndProvider>
        </div>
      </div>
    );
  }
}

SignDocContainer.propTypes = {
  doc: DocPropTypeShape.isRequired,
  fetchDocument: PropTypes.func.isRequired,
  // currentUser: UserPropTypeShape.isRequired,
  signatories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    doc: getDocumentById(docId)(state),
    currentUser: getCurrentUser(state),
    signatories: getSignatories(docId)(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    fetchDocument: () => dispatch(fetchDocument(docId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignDocContainer),
);
