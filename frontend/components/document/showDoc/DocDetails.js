/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import BreadCrumbs from '../../BreadCrumbs';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { TitleBar, RecipientsList, PDFSidebar } from './sectionComponents';

const DocDetails = ({
  doc,
  currentUser,
  deleteDocument,
  fetchSignedUrl,
  history,
}) => {
  // eslint-disable-next-line react/prop-types
  const { title, fileUrl, editors, owner } = doc;
  return (
    <div className="flex-col-container doc-show">
      <TitleBar
        doc={doc}
        actions={{
          deleteDocument,
          fetchSignedUrl,
        }}
        history
      />
      <RecipientsList editors={editors} owner={owner} />
      <PDFSidebar fileUrl={fileUrl} title={title} />
      {/* <PDF fileUrl={fileUrl} /> */}
    </div>
  );
};

DocDetails.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
    isOwner: PropTypes.bool.isRequired,
  }).isRequired,
  currentUser: UserPropTypeShape.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchSignedUrl: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  // eslint-disable-next-line react/require-default-props
  history: PropTypes.object,
};

export default DocDetails;
