/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import BreadCrumbs from '../../BreadCrumbs';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { TitleBar, Details, ButtonBar, PDF } from './sectionComponents';

const DocDetails = ({ doc, currentUser, deleteDocument }) => {
  // eslint-disable-next-line react/prop-types
  const { title, fileUrl } = doc;
  return (
    <div className="flex-col-container doc-show">
      <Link to="/documents">Back to Documents</Link>
      <TitleBar title={title} />
      <div className="flex-col-container">
        <Details doc={doc} />
        {/* <History></History> */}
      </div>
      <ButtonBar
        doc={doc}
        currentUser={currentUser}
        deleteDocument={deleteDocument}
      />
      <PDF fileUrl={fileUrl} />
    </div>
  );
};

DocDetails.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }).isRequired,
  currentUser: UserPropTypeShape.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};

export default DocDetails;
