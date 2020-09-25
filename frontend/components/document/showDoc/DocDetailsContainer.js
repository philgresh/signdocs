/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import DocDetails from './DocDetails';
import FourOhFour from '../../_404';
import { fetchDocument } from '../../../actions/document';
import {
  getDocumentById,
  getAssociatedUsers,
  getCurrentUser,
  getErrorsAt,
} from '../../../reducers/selectors';

const useFetchDoc = ({ docId }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let fullDoc = {};

  const doc = useSelector(getDocumentById(docId), isEqual);
  const docErrors = useSelector(getErrorsAt('documents'), isEqual);
  const associatedUsers = useSelector(getAssociatedUsers(docId), isEqual);
  const currentUser = useSelector(getCurrentUser, isEqual);

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
    // if (!doc || !Object.keys(doc).length) {
    setLoading(true);
    dispatch(fetchDocument(docId)).done(() => setLoading(false));
    // } else setLoading(false);
  }, [doc]);

  return [docErrors, fullDoc, loading];
};

useFetchDoc.propTypes = {
  docId: PropTypes.string.isRequired,
};

const DocDetailsContainer = () => {
  const history = useHistory();
  const { docId } = useParams();

  const [docErrors, doc, loading] = useFetchDoc({ docId });

  if (loading || !doc || doc === undefined) return <div>Loading...</div>;
  if (docErrors.status === 404)
    return <FourOhFour from={history.location.pathname} errors={docErrors} />;
  return <DocDetails doc={doc} />;
};

export default withRouter(DocDetailsContainer);
