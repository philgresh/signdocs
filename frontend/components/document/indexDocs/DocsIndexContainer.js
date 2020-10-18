import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import DocsIndex from './DocsIndex';
import Sidebar from './Sidebar';
import NoDocsCallToCreate from '../shared/NoDocsCallToCreate';
import { fetchDocuments } from '../../../actions/document';
import { getCurrentUser, getAllDocuments } from '../../../reducers/selectors';

const DocsIndexContainer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const docs = useSelector(getAllDocuments, isEqual);

  useEffect(() => {
    (async function getAllDocs() {
      setLoading(true);
      dispatch(fetchDocuments()).done(() => setLoading(false));
    })();
  }, []);

  const docsArray = docs && Object.keys(docs) ? Object.values(docs) : [];

  const currentUser = useSelector(getCurrentUser, shallowEqual);

  const DocsIndexOrNoDocs = () =>
    docsArray.length > 0 ? (
      <DocsIndex docs={docsArray} currentUser={currentUser} />
    ) : (
      <NoDocsCallToCreate />
    );

  return (
    <div id="index-container">
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

export default DocsIndexContainer;
