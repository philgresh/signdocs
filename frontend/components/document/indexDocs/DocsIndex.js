import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocsIndexItem from './DocsIndexItem';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';

const DocumentIndex = ({ documents, currentUser, deleteDocument }) => (
  <div>
    <div className="background-gradient" />
    <h2>Documents</h2>
    {documents.length > 0 ? (
      <>
        <Link to="/documents/new">Create a new document</Link>
        <ul className="docs-index">
          {documents.map((doc) => (
            <DocsIndexItem
              key={doc.id}
              doc={doc}
              currentUser={currentUser}
              deleteDocument={deleteDocument}
            />
          ))}
        </ul>
      </>
    ) : (
      <div className="call-to-create">
        <h2>You have no documents!</h2>
        <p>
          <Link to="/documents/new">Create a new document</Link>.
        </p>
      </div>
    )}
  </div>
);

DocumentIndex.propTypes = {
  documents: PropTypes.arrayOf(DocPropTypeShape),
  deleteDocument: PropTypes.func,
  currentUser: UserPropTypeShape,
};

DocumentIndex.defaultProps = {
  documents: [],
  deleteDocument: () => {},
  currentUser: {},
};

export default DocumentIndex;
