/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileDownload,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';

const ButtonBar = ({ doc, currentUser, deleteDocument, history }) => {
  const [deleting, setDeleting] = useState(false);
  // eslint-disable-next-line react/prop-types
  const { fileUrl, downloadUrl, ownerId, editorIds, id: docId } = doc;
  const isOwner = ownerId === currentUser.id;
  // eslint-disable-next-line react/prop-types
  const isEditor = isOwner || editorIds.includes(currentUser.id);

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
        .fail(() => {
          setDeleting(false);
        });
    } else {
      setDeleting(false);
    }
  };

  return (
    <div className="doc-button-bar">
      <a href={downloadUrl} download className="inline-link">
        Download&nbsp;
        {/* <FontAwesomeIcon icon={faFileDownload} /> */}
      </a>
      {isEditor && (
        <Link to={`documents/${docId}/edit`} className="inline-link">
          Edit
        </Link>
      )}
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
};

ButtonBar.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }),
  currentUser: UserPropTypeShape.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
};

ButtonBar.defaultProps = {
  doc: {},
};

export default withRouter(ButtonBar);
