/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import BreadCrumbs from '../../BreadCrumbs';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { TitleBar, Details, ButtonBar } from './sectionComponents';
import PDF from './pdf/pdf';

const DocDetails = ({ doc, currentUser, deleteDocument }) => {
  // eslint-disable-next-line react/prop-types
  const { title } = doc;
  return (
    <div className="doc-show">
      <Link to="/documents">Back to Documents</Link>
      <TitleBar title={title} />
      <Details doc={doc} />
      <ButtonBar
        doc={doc}
        currentUser={currentUser}
        deleteDocument={deleteDocument}
      />
      <PDF doc={doc} />
      {/* <History></History> */}
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
