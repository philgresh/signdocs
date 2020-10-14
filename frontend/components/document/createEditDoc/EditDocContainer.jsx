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
import { fetchUsers } from '../../../actions/user';
import {
  getErrors,
  getDocumentById,
  getUsersAsArray,
  getAssociatedUsers,
} from '../../../reducers/selectors';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { BreadCrumbs } from '../../helperComponents';

class EditDocContainer extends Component {
  componentDidMount() {
    this.props.fetchDoc();
    this.props.fetchAllUsers();
  }

  render() {
    const {
      action,
      formType,
      doc,
      errors,
      history,
      receiveError,
      users,
      signatories,
      currUserId,
    } = this.props;

    if (!doc) return null;

    const docState = {
      title: doc.title,
      description: doc.description,
      signatories: signatories.editors,
    };

    const breadCrumbsHistory = [
      {
        to: '/documents',
        title: 'Documents',
      },
      {
        to: `/documents/${doc.id}`,
        title: doc.title,
      },
      {
        to: `/documents/${doc.id}/edit`,
        title: 'Edit',
      },
    ];
    return (
      <>
        <BreadCrumbs history={breadCrumbsHistory} />
        <DocForm
          action={action}
          formType={formType}
          docState={docState}
          errors={errors}
          history={history}
          receiveError={receiveError}
          users={users}
          currUserId={currUserId}
        />
      </>
    );
  }
}

EditDocContainer.propTypes = {
  doc: DocPropTypeShape.isRequired,
  // eslint-disable-next-line react/require-default-props
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  formType: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  fetchDoc: PropTypes.func.isRequired,
  receiveError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(UserPropTypeShape).isRequired,
  signatories: PropTypes.arrayOf(UserPropTypeShape).isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  currUserId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { docId } = ownProps.match.params;

  const doc = getDocumentById(docId)(state);

  return {
    doc,
    errors: getErrors(state, 'documents'),
    formType: 'Edit Document',
    users: getUsersAsArray(state),
    signatories: getAssociatedUsers(docId)(state),
    currUserId: state.session.id,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    action: (formData) => dispatch(updateDocument(docId, formData)),
    fetchDoc: () => dispatch(fetchDocument(docId)),
    receiveError: (err) => dispatch(recError(err)),
    fetchAllUsers: () => dispatch(fetchUsers()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditDocContainer),
);
