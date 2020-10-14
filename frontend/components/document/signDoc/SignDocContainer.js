/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FourOhFour from '../../_404';
import Signatories from '../shared/Signatories';
import SignPDF from './SignPDF';

import { getSignatories } from '../../../reducers/selectors';
import { useFetchDoc } from '../../../utils/hooks';
import { BreadCrumbs } from '../../helperComponents';

const SignDocContainer = () => {
  const [_currSignatory, setCurrSignatory] = useState('');
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
      to: `/documents/${docId}`,
      title: doc.title,
    },
    {
      to: `/documents/${docId}/sign`,
      title: 'Sign',
    },
  ];

  if (loading || !doc || doc === undefined) return <div>Loading...</div>;
  if (docErrors?.status === 404)
    return <FourOhFour from={history.location.pathname} errors={docErrors} />;

  return (
    <div id="sign-doc-container">
      <BreadCrumbs history={breadCrumbsHistory} />

      <h1>Sign your document</h1>
      <div className="scroll-container">
        <div className="pdf-drag-container">
          <DndProvider backend={HTML5Backend}>
            <div className="side-bar">
              <Signatories
                signatories={signatories}
                onChangeSignatory={(sigId) => setCurrSignatory(sigId)}
              />
            </div>
            {doc && doc.fileUrl && (
              <div id="pdf-document-container">
                <SignPDF doc={doc} signatories={signatories} />
              </div>
            )}
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignDocContainer);
