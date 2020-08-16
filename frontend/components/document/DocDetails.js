/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { DocPropTypeShape, UserPropTypeShape } from '../propTypes';

const DocDetails = ({ doc, editors }) => {
  const { title, description, fileUrl } = doc;
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <p>Editors</p>
        <ul>
          {editors.length > 0 &&
            editors.map((editor) => (
              <li key={editor.id}>{editor.firstName}</li>
            ))}
        </ul>
        <a href={fileUrl} download>
          Download
        </a>
      </div>
    </div>
  );
};

DocDetails.propTypes = {
  doc: DocPropTypeShape,
  editors: PropTypes.arrayOf(UserPropTypeShape),
};

DocDetails.defaultProps = {
  doc: {},
  editors: [],
};

export default DocDetails;
