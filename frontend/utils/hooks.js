import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { fetchDocument, fetchDocuments } from '../actions/document';
import {
  getDocumentById,
  getAssociatedUsers,
  getCurrentUser,
  getErrorsAt,
  getAllDocuments,
} from '../reducers/selectors';

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
    setLoading(true);
    dispatch(fetchDocument(docId)).done(() => setLoading(false));
  }, [doc]);

  return { errors: docErrors, doc: fullDoc, loading };
};

const useFetchDocs = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const docs = useSelector(getAllDocuments, isEqual);
  const docErrors = useSelector(getErrorsAt('documents'), isEqual);

  useEffect(() => {
    if (!docs || !Object.keys(docs).length) {
      setLoading(true);
      dispatch(fetchDocuments()).done(() => setLoading(false));
    } else setLoading(false);
  }, [docs]);

  const docsArray = docs && Object.keys(docs) ? Object.values(docs) : [];
  return { errors: docErrors, docs: docsArray, loading };
};

useFetchDoc.propTypes = {
  docId: PropTypes.string.isRequired,
};

useFetchDocs.propTypes = {
  docId: PropTypes.string.isRequired,
};

export { useFetchDoc, useFetchDocs };
