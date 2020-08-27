/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
import ContentFields from './ContentFields';
import { DocPropTypeShape } from '../../propTypes';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SignPDF = ({ doc }) => {
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
        {Array.from(new Array(numPages), (_el, index) => {
          const thisPage = index + 1;
          const key = `page_${thisPage}`;
          return (
            <div
              id={key}
              className="page-wrapper"
              data-page={thisPage}
              key={key}
            >
              <ContentFields thisPage={thisPage} />
              <Page pageNumber={thisPage} />
            </div>
          );
        })}
      </Document>
      {!docLoadSuccess && <div className="react-pdf__Document card" />}
    </div>
  );
};

SignPDF.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    fileUrl: PropTypes.string,
  }).isRequired,
};

export default SignPDF;
