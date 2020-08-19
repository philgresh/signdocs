import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DocPropTypeShape } from '../../propTypes';

const DocsIndexItem = ({ doc }) => {
  const { id: docId, title, description } = doc;
  return (
    <li>
      <Link to={`/documents/${docId}`}>{title}</Link>
      <p>{description}</p>
    </li>
  );
};

DocsIndexItem.propTypes = {
  doc: DocPropTypeShape.isRequired,
};

export default DocsIndexItem;
