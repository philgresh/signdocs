/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PrepPDF from './PrepPDF';
import { Fields, Signatories } from '../shared';
import { fetchDocument } from '../../../actions/document';
import { getSignatories, getDocumentById } from '../../../reducers/selectors';

const PrepareDocContainer = () => {
  const dispatch = useDispatch();
  const { docId } = useParams();

  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState(null);
  const [currSignatory, setCurrSignatory] = useState('');

  const signatories = useSelector((state) => getSignatories(docId)(state));
  const staleDocData = useSelector((state) => getDocumentById(docId)(state));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDocument(docId)).then((res) => {
        setDoc(res.document);
        setLoading(false);

        document.title = `SignDocs - Sign ${res.document.title}`;
      });
    };

    if (staleDocData) {
      setDoc(staleDocData);
    } else fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="sign-doc-container">
      <h2>Prepare your document for signatures</h2>
      <div className="pdf-drag-container">
        <DndProvider backend={HTML5Backend}>
          <div className="side-bar">
            <Signatories
              currSignatory={currSignatory}
              signatories={signatories}
              onChangeSignatory={(sigId) => setCurrSignatory(sigId)}
            />
            <Fields currSignatory={currSignatory} />
          </div>
          {doc && doc.fileUrl && <PrepPDF doc={doc} />}
        </DndProvider>
      </div>
    </div>
  );
};

export default withRouter(PrepareDocContainer);
