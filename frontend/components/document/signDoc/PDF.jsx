/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Outline, pdfjs } from 'react-pdf';
import { DocPropTypeShape } from '../../propTypes';
import { Container } from './dnd/Container';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({ doc: { fileUrl } }) => {
  const [pdf, setPDF] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [docLoadSuccess, setDocLoadSuccess] = useState(false);
  const [pages, setPages] = useState([]);
  const [numPages, setNumPages] = useState(null);

  const addRectToCanvas = () => {
    const canvas = document.getElementsByClassName(
      'react-pdf__Page__canvas',
    )[0];
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'green';
    ctx.strokeRect(20, 10, 160, 100);
  };

  const onDocumentLoadSuccess = (_pdf) => {
    const { numPages: numP } = _pdf;
    const pagesArr = Array.from({ length: numPages - 1 }, (_e, i) => i + 2);
    setPages(pagesArr);
    setDocLoadSuccess(true);
    setNumPages(numP);
    setPDF(_pdf);
    window.pdf = _pdf;
    window.addRectToCanvas = addRectToCanvas;
  };

  // const onItemClick = (e) => {
  //   console.log(e);
  //   const { pageNumber: itemPageNumber } = e;
  //   setPageNumber(itemPageNumber);
  //   const elmnt = document.getElementById(`page_${itemPageNumber}`);
  //   elmnt.scrollIntoView();
  // };

  // <canvas className="pdf-droppable-canvas"  width="595" height="842" /> 
  return (
    <div className="pdf-document-container">
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_el, index) => (
          <Container key={`page_${index + 1}`} className="droppable-container">
            <div
              id={`page_${index + 1}`}
              className="page-wrapper"
              data-page={index + 1}
            >
              <Page pageNumber={index + 1} />
            </div>
          </Container>
        ))}
      </Document>
      {!docLoadSuccess && <div className="react-pdf__Document card" />}
    </div>
  );
};

PDF.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    fileUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default PDF;
