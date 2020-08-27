/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PrepPDF from './PrepPDF';
import { Fields, Assignees } from '../shared';
import { fetchDocument } from '../../../actions/document';
import {
  getDocumentById,
  getAssignees,
  getCurrentUser,
} from '../../../reducers/selectors';
import {
  DocPropTypeShape,
  // UserPropTypeShape
} from '../../propTypes';

class PrepareDocContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currAssignee: null,
    };
    this.onChangeAssignee = this.onChangeAssignee.bind(this);
  }

  componentDidMount() {
    const { fetchDocument: fetchDoc, doc } = this.props;
    fetchDoc();
    if (doc) {
      document.title = `SignDocs - Sign ${doc.title}`;
    }
  }

  onChangeAssignee(assigneeId) {
    this.setState({
      currAssignee: assigneeId,
    });
  }

  render() {
    if (!this.props.doc || Object.keys(this.props.doc).length === 0)
      return <div />;

    const { currAssignee } = this.state;
    const { doc, assignees } = this.props;
    return (
      <div className="sign-doc-container">
        <div className="pdf-drag-container">
          <DndProvider backend={HTML5Backend}>
            <div className="side-bar">
              <Assignees
                currAssignee={currAssignee}
                assignees={assignees}
                onChangeAssignee={this.onChangeAssignee}
              />
              <Fields currAssignee={currAssignee} />
            </div>
            {doc && doc.fileUrl && <PrepPDF doc={doc} />}
          </DndProvider>
        </div>
      </div>
    );
  }
}

PrepareDocContainer.propTypes = {
  doc: DocPropTypeShape.isRequired,
  fetchDocument: PropTypes.func.isRequired,
  // currentUser: UserPropTypeShape.isRequired,
  assignees: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    doc: getDocumentById(docId)(state),
    currentUser: getCurrentUser(state),
    assignees: getAssignees(docId)(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    fetchDocument: () => dispatch(fetchDocument(docId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrepareDocContainer),
);
