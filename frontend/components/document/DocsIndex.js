import React from 'react';
import PropTypes from 'prop-types';
import DocPropTypeShape from './propTypes';

export default function DocumentIndex({ documents }) {
  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>{doc.title}</li>
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
