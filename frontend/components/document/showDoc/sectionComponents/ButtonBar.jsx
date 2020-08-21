/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';

const ButtonBar = ({ doc, deleteDocument, history }) => {
  const [deleting, setDeleting] = useState(false);
  // eslint-disable-next-line react/prop-types
  const { fileUrl, downloadUrl, id: docId, isOwner } = doc;

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
    <>
      <div className="flex-item-left">
        <a
          href={downloadUrl}
          download
          className="inline-link"
          aria-label="Download this document"
        >
          <FontAwesomeIcon icon={faDownload} color="inherit" />
        </a>
        <a
          href={fileUrl}
          title="Print"
          rel="noreferrer nofollow"
          className="inline-link"
          aria-label="Open this document to print"
        >
          <FontAwesomeIcon icon={faPrint} color="inherit" />
        </a>
      </div>
      <div className="flex-right">
        {isOwner && (
          <>
            <Link to={`documents/${docId}/edit`} className="inline-link">
              Edit
            </Link>
            <button
              className="flat"
              type="button"
              title="Delete document"
              onClick={onDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </>
        )}
      </div>
    </>
  );
};

ButtonBar.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }).isRequired,
  deleteDocument: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(ButtonBar);
