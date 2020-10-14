import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocsIndex from './DocsIndex';
import Sidebar from './Sidebar';
import NoDocsCallToCreate from '../shared/NoDocsCallToCreate';
import { getCurrentUser } from '../../../reducers/selectors';
import { useFetchDocs } from '../../../utils/hooks';

const DocsIndexContainer = () => {
  const { docs, loading } = useFetchDocs();
  const currentUser = useSelector(getCurrentUser, shallowEqual);

  const DocsIndexOrNoDocs = () =>
    docs.length > 0 ? (
      <DocsIndex docs={docs} currentUser={currentUser} />
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

export default withRouter(DocsIndexContainer);
