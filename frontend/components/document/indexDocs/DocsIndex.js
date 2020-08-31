import React from 'react';
import PropTypes from 'prop-types';
import DocsIndexGridHeader from './DocsIndexGridHeader';
import DocsIndexItem from './DocsIndexItem';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';

const sortedDocs = (docs) => docs.sort((a, b) => a.updatedAt < b.updatedAt);

const DocumentIndex = ({ docs, currentUser }) => {
  return (
    <div className="docs-index">
      <DocsIndexGridHeader />
      {sortedDocs(docs).map((doc) => (
        <DocsIndexItem key={doc.id} doc={doc} currentUser={currentUser} />
      ))}
    </div>
  );
};

DocumentIndex.propTypes = {
  docs: PropTypes.arrayOf(DocPropTypeShape),
  currentUser: UserPropTypeShape,
};

DocumentIndex.defaultProps = {
  docs: [],
  currentUser: {},
};

export default DocumentIndex;
