/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocForm from './DocForm';
import {
  fetchDocument,
  updateDocument,
  receiveError as recError,
} from '../../../actions/document';
import { getErrors, getDocumentById } from '../../../reducers/selectors';
import { DocPropTypeShape } from '../../propTypes';

class EditDocForm extends Component {
  componentDidMount() {
    this.props.fetchDoc();
  }

  render() {
    // DO NOT MODIFY THIS FUNCTION
    const { action, formType, doc, errors, history, receiveError } = this.props;

    // Hint: The report will not exist on the first render - what do we need to
    // do to get it?
    if (!doc) return null;
    const docState = {
      title: doc.title,
      description: doc.description,
    };
    return (
      <DocForm
        action={action}
        formType={formType}
        docState={docState}
        errors={errors}
        history={history}
        receiveError={receiveError}
      />
    );
  }
}

EditDocForm.propTypes = {
  doc: DocPropTypeShape.isRequired,
  // eslint-disable-next-line react/require-default-props
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  formType: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  fetchDoc: PropTypes.func.isRequired,
  receiveError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { docId } = ownProps.match.params;

  const doc = getDocumentById(docId)(state);

  return {
    doc,
    errors: getErrors(state, 'documents'),
    formType: 'Edit Document',
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    action: (formData) => dispatch(updateDocument(docId, formData)),
    fetchDoc: () => dispatch(fetchDocument(docId)),
    receiveError: (err) => dispatch(recError(err)),
  };
};

const EditDocContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditDocForm),
);

export default EditDocContainer;
