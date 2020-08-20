import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({ fileUrl }) => {
  const [docLoadSuccess, setDocLoadSuccess] = useState(false);
  const [pageChange, setPageChange] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = (e) => {
    // console.log(e);
    const { numPages: numP } = e;
    setDocLoadSuccess(true);
    setNumPages(numP);
  };

  const nextPage = () => {
    setPageChange(true);
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    setPageChange(false);
  };

  const prevPage = () => {
    setPageChange(true);
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
    setPageChange(false);
  };

  const ButtonsRow = () => (
    <div className="pages-buttons">
      {numPages > 1 && (
        <button
          type="button"
          onClick={prevPage}
          disabled={pageChange || pageNumber <= 1}
        >
          &lt;
        </button>
      )}
      <p>
        Page {pageNumber} of {numPages}
      </p>
      {numPages > 1 && (
        <button
          type="button"
          onClick={nextPage}
          disabled={pageChange || pageNumber >= numPages}
        >
          &gt;
        </button>
      )}
    </div>
  );

  return (
    <div className="pdf-document-container">
      <ButtonsRow />
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      {!docLoadSuccess && <div className="react-pdf__Document card" />}
    </div>
  );
};

PDF.propTypes = {
  fileUrl: PropTypes.string.isRequired,
};

export default PDF;
