import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDF({ doc: { fileUrl } }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages: numP }) {
    setNumPages(numP);
  }
  return (
    <div>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <button
        type="button"
        onClick={() => {
          if (pageNumber > 1) setPageNumber(pageNumber - 1);
        }}
      >
        &lt;
      </button>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button
        type="button"
        onClick={() => {
          if (pageNumber < numPages) setPageNumber(pageNumber + 1);
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default PDF;
