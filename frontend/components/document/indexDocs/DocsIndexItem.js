import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { getUserDetails } from '../../../reducers/selectors';
// import Avatar from '../../user/avatar';

const DocsIndexItem = ({ doc, currentUser, deleteDocument }) => {
  const {
    id: docId,
    title,
    updatedAt,
    contentFieldsCount,
    ownerId,
    editorIds,
  } = doc;
  const ownerDetails = useSelector(getUserDetails(ownerId));
  const isOwner = ownerDetails.id === currentUser.id;
  const isEditor = isOwner || editorIds.includes(currentUser.id);

  let ownerSection = null;

  const onDelete = () => {
    deleteDocument(docId);
  };

  if (isEditor) {
    ownerSection = (
      <div className="card-actions">
        <Link to={`documents/${docId}/edit`} className="inline-link">
          Edit
        </Link>
        {isOwner && (
          <button type="button" className="flat warn" onClick={onDelete}>
            Delete
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
      <div className="flex-row-container flex-between flex-item card-body">
        {/* <p className="card-title flex-item">{title}</p> */}
        {/* <p>{contentFieldsCount} fields added</p> */}
      </div>
      <div className="flex-item status card-body">In Process</div>
      <div className="flex-row-container flex-item card-body">
        <time className="flex-item">{updatedAt}</time>
        {ownerSection}
      </div>
    </div>
  );
};

DocsIndexItem.propTypes = {
  deleteDocument: PropTypes.func.isRequired,
  doc: DocPropTypeShape.isRequired,
  currentUser: UserPropTypeShape.isRequired,
};

export default DocsIndexItem;
