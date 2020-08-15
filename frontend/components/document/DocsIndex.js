import React from 'react';
import PropTypes from 'prop-types';
import DocPropTypeShape from './propTypes';

export default function DocumentIndex({ documents }) {
  const docsArray = Object.values(documents);
  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {docsArray.map((doc) => (
          <li key={doc.id}>{doc.title}</li>
        ))}
      </ul>
    </div>
  );
}

DocumentIndex.propTypes = {
  documents: PropTypes.objectOf(DocPropTypeShape),
};

DocumentIndex.defaultProps = {
  documents: {},
};
