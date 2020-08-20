/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { getUserDetails } from '../../../reducers/selectors';
// import Avatar from '../../user/avatar';

const DocsIndexItem = ({ doc, currentUser, deleteDocument, history }) => {
  const [deleting, setDeleting] = useState(false);
  const { id: docId, title, updatedAt, ownerId, editorIds } = doc;
  const ownerDetails = useSelector(getUserDetails(ownerId));
  const isOwner = ownerDetails.id === currentUser.id;
  const isEditor = isOwner || editorIds.includes(currentUser.id);

  let ownerSection = null;

  const onDelete = () => {
    setDeleting(true);
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Are you sure you want to delete this document?',
    );
    if (confirmed) {
      deleteDocument()
        .then(() => {
          history.push('/documents');
        })
        .catch((err) => {
          console.error(err);
          setDeleting(false);
        });
    } else {
      setDeleting(false);
    }
  };

  const updatedAtText = moment(updatedAt).fromNow();

  if (isEditor) {
    ownerSection = (
      <div className="card-actions">
        <Link to={`documents/${docId}/edit`} className="inline-link">
          Edit
        </Link>
        {isOwner && (
          <button
            type="button"
            className="flat warn"
            onClick={onDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    );
  } else {
    ownerSection = (
      <p>{`${ownerDetails.firstName} ${ownerDetails.lastName}`}</p>
    );
  }

  return (
    <div className="linkable-card index-item flex-col-container flex-between">
      <Link to={`/documents/${docId}`} className="card-link" />
      <p className="card-title flex-item">{title}</p>
      <div className="flex-item status card-body">In Process</div>
      <div className="flex-row-container flex-item card-body">
        <time className="flex-item" dateTime={updatedAt}>
          {updatedAtText}
        </time>
        {ownerSection}
      </div>
    </div>
  );
};

DocsIndexItem.propTypes = {
  deleteDocument: PropTypes.func.isRequired,
  doc: DocPropTypeShape.isRequired,
  currentUser: UserPropTypeShape.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
};

export default DocsIndexItem;
