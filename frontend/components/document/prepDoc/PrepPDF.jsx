/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
import DroppableContainer from './DroppableContainer';
import { DocPropTypeShape } from '../../propTypes';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({ doc }) => {
  const [docLoadSuccess, setDocLoadSuccess] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = (_pdf) => {
    const { numPages: numP } = _pdf;
    setDocLoadSuccess(true);
    setNumPages(numP);
  };

  return (
    <div className="pdf-document-container">
      <Document file={doc.fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {docLoadSuccess &&
          Array.from(new Array(numPages), (_el, index) => (
            <DroppableContainer
              key={`page_${index + 1}`}
              className="droppable-container"
              thisPage={index + 1}
            >
              <div
                id={`page_${index + 1}`}
                className="page-wrapper"
                data-page={index + 1}
              >
                <Page pageNumber={index + 1} />
              </div>
            </DroppableContainer>
          ))}
      </Document>
      {!docLoadSuccess && <div className="react-pdf__Document card" />}
    </div>
  );
};

PDF.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    fileUrl: PropTypes.string,
  }).isRequired,
};

export default PDF;