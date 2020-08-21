import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DocsIndexGridHeader from './DocsIndexGridHeader';
import DocsIndexItem from './DocsIndexItem';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';

const NoDocsCallToCreate = () => (
  <div className="call-to-create">
    <h2>You have no documents!</h2>
    <p>
      <Link to="/documents/new">Create a new document</Link>.
    </p>
  </div>
);

const sortedDocs = (docs) => docs.sort((a, b) => a.updatedAt < b.updatedAt);

const DocumentIndex = ({ docs, currentUser, deleteDocument }) => {
  return (
    <div className="index-inbox">
      <div className="search-bar">
        <h2>Inbox</h2>
      </div>

      {docs.length > 0 ? (
        <div className="docs-index">
          <DocsIndexGridHeader />
          {sortedDocs(docs).map((doc) => (
            <DocsIndexItem
              key={doc.id}
              doc={doc}
              currentUser={currentUser}
              deleteDocument={deleteDocument}
            />
          ))}
        </div>
      ) : (
        <NoDocsCallToCreate />
      )}
    </div>
  );
};

DocumentIndex.propTypes = {
  docs: PropTypes.arrayOf(DocPropTypeShape),
  deleteDocument: PropTypes.func,
  currentUser: UserPropTypeShape,
};

DocumentIndex.defaultProps = {
  docs: [],
  deleteDocument: () => {},
  currentUser: {},
};

export default DocumentIndex;
