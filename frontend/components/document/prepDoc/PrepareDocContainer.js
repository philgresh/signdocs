/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withRouter, useParams, useHistory, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PrepPDF from './PrepPDF';
import FourOhFour from '../../_404';
import { Fields, Signatories } from '../shared';
import { BreadCrumbs } from '../../helperComponents';
import { getSignatories } from '../../../reducers/selectors';
import { useFetchDoc } from '../../../utils/hooks';

const CallToSignDoc = ({ docId, status }) => {
  if (status !== 'Being Prepared') return <div />;
  return (
    <div className="call-to-sign-doc">
      <hr />
      <h3>You&apos;ve successfully added content fields</h3>
      <Link to={`/documents/${docId}/sign`}>Sign this document</Link>
    </div>
  );
};

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
    <div id="prep-doc-container">
      <BreadCrumbs history={breadCrumbsHistory} />

      <h1>Prepare your document for signatures</h1>
      <div className="scroll-container">
        <div className="pdf-drag-container">
          <DndProvider backend={HTML5Backend} displayName="DndProvider">
            <div className="side-bar">
              <Signatories
                currSignatory={currSignatory}
                signatories={signatories}
                onChangeSignatory={(sigId) => setCurrSignatory(sigId)}
              />
              <Fields currSignatory={currSignatory} />
              <CallToSignDoc docId={doc.id} status={doc.status} />
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

CallToSignDoc.propTypes = {
  docId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default withRouter(PrepareDocContainer);
