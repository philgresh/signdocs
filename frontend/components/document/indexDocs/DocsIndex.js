import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocsIndexItem from './DocsIndexItem';
import { DocPropTypeShape } from '../../propTypes';

const DocumentIndex = ({ documents }) => (
  <div>
    <h2>Documents</h2>
    {documents.length > 0 ? (
      <>
        <Link to="/documents/new">Create a new document</Link>
        <ul>
          {documents.map((doc) => (
            <DocsIndexItem key={doc.id} doc={doc} />
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
};

DocumentIndex.defaultProps = {
  documents: [],
};

export default DocumentIndex;
