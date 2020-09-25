import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocsIndex from './DocsIndex';
import Sidebar from './Sidebar';
import NoDocsCallToCreate from '../shared/NoDocsCallToCreate';
import { fetchDocuments } from '../../../actions/document';
import {
  getAllDocuments,
  getCurrentUser,
  getErrorsAt,
} from '../../../reducers/selectors';

const useFetchDocs = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const docs = useSelector(getAllDocuments, shallowEqual);
  const docErrors = useSelector(getErrorsAt('documents'), shallowEqual);

  useEffect(() => {
    if (!docs || !Object.keys(docs).length) {
      setLoading(true);
      dispatch(fetchDocuments()).done(() => setLoading(false));
    } else setLoading(false);
  }, [docs]);

  const docsArray = docs && Object.keys(docs) ? Object.values(docs) : [];
  return [docErrors, docsArray, loading];
};

const DocsIndexContainer = () => {
  const [_docErrors, docs, loading] = useFetchDocs();
  const currentUser = useSelector(getCurrentUser, shallowEqual);

  const DocsIndexOrNoDocs = () =>
    docs.length > 0 ? (
      <DocsIndex docs={docs} currentUser={currentUser} />
    ) : (
      <NoDocsCallToCreate />
    );

  return (
    <div className="index-container">
      <Sidebar />
      <div className="index-inbox">
        <div className="search-bar">
          <h2>Inbox</h2>
        </div>
        {loading ? <div>Loading...</div> : <DocsIndexOrNoDocs />}
      </div>
    </div>
  );
};

export default withRouter(DocsIndexContainer);
