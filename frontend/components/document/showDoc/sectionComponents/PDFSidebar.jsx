import React from 'react';
import PropTypes from 'prop-types';
// import { Document, Page, pdfjs } from 'react-pdf';

// eslint-disable-next-line max-len
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFSidebar = ({ previewImageUrl }) => {
  return (
    <div className="doc-show-pdf-sidebar">
      {previewImageUrl !== '' && (
        <div>
          <img src={previewImageUrl} alt="Document Preview" width={150} />
          <div className="sidebar-pagecount">Preview</div>
        </div>
      )}
    </div>
  );
};

PDFSidebar.propTypes = {
  previewImageUrl: PropTypes.string.isRequired,
};

export default PDFSidebar;
