/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { TitleBar, RecipientsList, PDFSidebar } from './sectionComponents';

const DocDetails = ({ doc, deleteDocument, fetchSignedUrl, history }) => {
  // eslint-disable-next-line react/prop-types
  const { title, fileUrl, editors, owner, previewImageUrl } = doc;
  return (
    <div className="flex-col-container doc-show">
      <TitleBar
        doc={doc}
        actions={{
          deleteDocument,
          fetchSignedUrl,
        }}
        history={history}
      />
      <RecipientsList editors={editors} owner={owner} />
      <PDFSidebar
        fileUrl={fileUrl}
        title={title}
        previewImageUrl={previewImageUrl}
      />
    </div>
  );
};

DocDetails.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
    isOwner: PropTypes.bool,
    previewImageUrl: PropTypes.string,
  }).isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchSignedUrl: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  // eslint-disable-next-line react/require-default-props
  history: PropTypes.object,
};

export default DocDetails;
