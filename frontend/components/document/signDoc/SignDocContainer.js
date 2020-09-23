/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Signatories from '../shared/Signatories';
import SignPDF from './SignPDF';

import { fetchDocument } from '../../../actions/document';
import { getDocumentById, getSignatories } from '../../../reducers/selectors';

const SignDocContainer = () => {
  const dispatch = useDispatch();
  const { docId } = useParams();

  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState(null);
  const [_currSignatory, setCurrSignatory] = useState('');

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
      <h2>Sign your document</h2>
      <div className="pdf-drag-container">
        <DndProvider backend={HTML5Backend}>
          <div className="side-bar">
            <Signatories
              signatories={signatories}
              onChangeSignatory={(sigId) => setCurrSignatory(sigId)}
            />
          </div>
          {doc && doc.fileUrl && (
            <SignPDF doc={doc} signatories={signatories} />
          )}
        </DndProvider>
      </div>
    </div>
  );
};

export default withRouter(SignDocContainer);
