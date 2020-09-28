import React from 'react';
import PropTypes from 'prop-types';
import {
  DocPropTypeShape,
  UserPropTypeShape,
  DocDefaultProps,
} from '../../propTypes';
import { TitleBar, RecipientsList, PDFSidebar } from './sectionComponents';

const DocDetails = ({ doc }) => {
  if (!doc || !Object.keys(doc).length) return <div>Loading...</div>;

  // eslint-disable-next-line react/prop-types
  const { title, fileUrl, editors, owner, previewImageUrl } = doc;
  return (
    <div className="flex-col-container doc-show">
      <TitleBar doc={doc} />
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
    id: PropTypes.string,
    currentUser: UserPropTypeShape,
  }).isRequired,
};

DocDetails.defaultProps = DocDefaultProps;

export default DocDetails;
