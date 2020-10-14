/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PrepPDF from './PrepPDF';
import FourOhFour from '../../_404';
import { Fields, Signatories } from '../shared';
import { BreadCrumbs } from '../../helperComponents';
import { getSignatories } from '../../../reducers/selectors';
import { useFetchDoc } from '../../../utils/hooks';

const PrepareDocContainer = () => {
  const [currSignatory, setCurrSignatory] = useState('');

  const history = useHistory();
  const { docId } = useParams();

  const { docErrors, doc, loading } = useFetchDoc({ docId });
  const signatories = useSelector(getSignatories(docId));

  const breadCrumbsHistory = [
    {
      to: '/documents',
      title: 'Documents',
    },
    {
      to: `/documents/${doc.id}`,
      title: doc.title,
    },
    {
      to: `/documents/${doc.id}/prepare`,
      title: 'Prepare',
    },
  ];

  if (loading || !doc || doc === undefined) return <div>Loading...</div>;
  if (docErrors?.status === 404)
    return <FourOhFour from={history.location.pathname} errors={docErrors} />;
  return (
    <div id="sign-doc-container">
      <BreadCrumbs history={breadCrumbsHistory} />

      <h1>Prepare your document for signatures</h1>
      <div className="scroll-container">
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
            {doc && doc.fileUrl && (
              <div id="pdf-document-container">
                <PrepPDF doc={doc} />
              </div>
            )}
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PrepareDocContainer);
