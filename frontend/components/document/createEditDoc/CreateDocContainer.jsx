/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateDocForm from './DocForm';
import { createDocument, receiveError } from '../../../actions/document';
import { fetchUsers } from '../../../actions/user';
import { getErrors, getUsersAsArray } from '../../../reducers/selectors';
import { UserPropTypeShape } from '../../propTypes';
import { BreadCrumbs } from '../../helperComponents';

class CreateDocContainer extends Component {
  componentDidMount() {
    const { fetchAllUsers } = this.props;
    fetchAllUsers();
  }

  render() {
    const history = [
      {
        to: '/documents',
        title: 'Documents',
      },
      {
        to: '/documents/new',
        title: 'Create',
      },
    ];
    return (
      <>
        <BreadCrumbs history={history} />
        <CreateDocForm {...this.props} />
      </>
    );
  }
}

CreateDocContainer.propTypes = {
  docState: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  action: PropTypes.func.isRequired,
  receiveError: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(UserPropTypeShape).isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  currUserId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  docState: {
    title: '',
    description: '',
    signatories: [],
  },
  errors: getErrors(state, 'documents'),
  formType: 'Create Document',
  users: getUsersAsArray(state),
  currUserId: state.session.id,
});

const mapDispatchToProps = (dispatch) => ({
  action: (formData) => dispatch(createDocument(formData)),
  receiveError: (err) => dispatch(receiveError(err)),
  fetchAllUsers: () => dispatch(fetchUsers()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateDocContainer),
);
