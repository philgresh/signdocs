/* eslint-disable react/require-default-props */
import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { getUserDetails } from '../../../reducers/selectors';
// import Avatar from '../../user/avatar';

const DocsIndexItem = ({
  doc,
  currentUser,
  // deleteDocument,
  // history
}) => {
  // const [deleting, setDeleting] = React.useState(false);
  const { id: docId, title, updatedAt, ownerId } = doc;
  const ownerDetails = useSelector(getUserDetails(ownerId));
  const isOwner = ownerDetails.id === currentUser.id;

  const updatedAtText = moment(updatedAt).format('M/D/YYYY');

  return (
    <Fragment key={docId}>
      <div data-id={docId}>&nbsp;</div>
      <div className="docs-index-subject">
        <Link to={`/documents/${docId}`}>
          <div className="docs-index-title">{title}</div>
        </Link>
        {isOwner ? (
          <div className="docs-index-recipients">To: RECIPIENTS</div>
        ) : (
          <div className="docs-index-owner">From: OWNER</div>
        )}
      </div>
      <div>{doc.status || 'In Progress'}</div>
      <div>
        <time dateTime={updatedAt}>{updatedAtText}</time>
        <br />
        <div> {moment(updatedAt).format('H:mma')}</div>
      </div>
      <div>&nbsp;</div>
    </Fragment>
  );
};

DocsIndexItem.propTypes = {
  doc: DocPropTypeShape.isRequired,
  // deleteDocument: PropTypes.func.isRequired,
  currentUser: UserPropTypeShape.isRequired,
  // // eslint-disable-next-line react/forbid-prop-types
  // history: PropTypes.object,
};

export default DocsIndexItem;
