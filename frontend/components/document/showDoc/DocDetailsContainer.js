/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import DocDetails from './DocDetails';
import FourOhFour from '../../_404';
import {
  fetchDocument,
  deleteDocument as deleteAction,
} from '../../../actions/document';
import {
  getDocumentById,
  getAssociatedUsers,
  getCurrentUser,
  getErrorsAt,
} from '../../../reducers/selectors';

const useFetchDoc = ({ docId }) => {
  const dispatch = useDispatch();
  let fullDoc = {};

  const doc = useSelector(getDocumentById(docId), shallowEqual);
  const docErrors = useSelector(getErrorsAt('documents'));
  const associatedUsers = useSelector(getAssociatedUsers(docId), shallowEqual);
  const currentUser = useSelector(getCurrentUser, shallowEqual);

  if (doc && Object.keys(doc).length) {
    const { editors, owner } = associatedUsers;
    fullDoc = {
      ...doc,
      editors,
      owner,
      isOwner: owner.id === currentUser.id,
    };
  }

  useEffect(() => {
    if (!doc || !Object.keys(doc).length) {
      dispatch(fetchDocument(docId));
    }
  }, [doc]);

  return [docErrors, fullDoc];
};

useFetchDoc.propTypes = {
  docId: PropTypes.string.isRequired,
};

const DocDetailsContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { docId } = useParams();
  const deleteDocument = dispatch(deleteAction(docId));

  const [docErrors, doc] = useFetchDoc({ docId });

  if (!doc || doc === undefined) return <div>Loading...</div>;
  if (docErrors.status === 404)
    return <FourOhFour from={history.location.pathname} errors={docErrors} />;
  return <DocDetails doc={doc} deleteDocument={deleteDocument} />;
};

export default withRouter(DocDetailsContainer);
