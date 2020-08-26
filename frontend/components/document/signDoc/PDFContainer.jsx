/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PDF from './PDF';
import { DocPropTypeShape } from '../../propTypes';

const PDFContainer = ({ doc }) => {
  const [allBoxes, setBoxes] = useState({
    a: {
      id: 'a',
      bbox: {
        top: 20,
        left: 80,
        width: 100,
        height: 30,
      },
      top: 20,
      left: 80,
      title: 'Drag me around',
      page: 1,
      docId: '6eaed6a4-6281-4374-9ae7-0bbf7e17de19',
      contentableId: '432',
      contentableType: 'signatureBlock',
      assignee: '444',
    },
  });

  return <PDF doc={doc} allBoxes={allBoxes} setBoxes={setBoxes} />;
};

PDFContainer.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    fileUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default PDFContainer;
