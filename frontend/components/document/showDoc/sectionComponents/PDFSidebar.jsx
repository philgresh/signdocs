import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFSidebar = ({ fileUrl }) => {
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
  return (
    <div className="doc-show-pdf-sidebar">
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

PDFSidebar.propTypes = {};

export default PDFSidebar;
