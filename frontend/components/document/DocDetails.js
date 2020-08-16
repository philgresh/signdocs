/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import {
  DocPropTypeShape,
  // UserPropTypeShape
} from '../propTypes';

const DocDetails = ({ doc }) => {
  const { title, description, editors, fileUrl } = doc;
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <p>Editors</p>
        <ul>
          {editors &&
            editors.map((editor) => (
              <li key={editor.id}>{editor.firstName}</li>
            ))}
        </ul>
        <Link to={fileUrl}>Download</Link>
      </div>
    </div>
  );
};

DocDetails.propTypes = {
  doc: DocPropTypeShape,
};

DocDetails.defaultProps = {
  doc: { editors: [] },
};

export default DocDetails;
