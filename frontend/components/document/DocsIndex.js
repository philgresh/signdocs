import React from 'react';
import PropTypes from 'prop-types';
import DocsIndexItem from './DocsIndexItem';
import { DocPropTypeShape } from '../propTypes';

export default function DocumentIndex({ documents }) {
  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map((doc) => (
          <DocsIndexItem key={doc.id} doc={doc} />
        ))}
      </ul>
    </div>
  );
}

DocumentIndex.propTypes = {
  documents: PropTypes.arrayOf(DocPropTypeShape),
};

DocumentIndex.defaultProps = {
  documents: [],
};
