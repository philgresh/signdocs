/* eslint-disable react/prop-types */
import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import ContentFields from './ContentFields';
import { DocProps } from '../../tsProps';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type SignPDFProps = {
  doc: DocProps;
};

const SignPDF = ({ doc }: SignPDFProps) => {
  const [docLoadSuccess, setDocLoadSuccess] = React.useState(false);
  const [numPages, setNumPages] = React.useState(null);

  const onDocumentLoadSuccess = (pdf) => {
    const { numPages: numP } = pdf;
    setDocLoadSuccess(true);
    setNumPages(numP);
  };

  return (
    <>
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
              {docLoadSuccess && <ContentFields thisPage={thisPage} />}
              <Page pageNumber={thisPage} />
            </div>
          );
        })}
      </Document>
      {!docLoadSuccess && <div className="react-pdf__Document card" />}
    </>
  );
};

export default SignPDF;
