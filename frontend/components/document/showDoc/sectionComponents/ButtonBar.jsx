import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faPrint,
  faEdit,
  faTrashAlt,
  faStamp,
} from '@fortawesome/free-solid-svg-icons';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';
import { deleteDocument } from '../../../../actions/document';

const ButtonBar = ({ doc, history }) => {
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line react/prop-types
  const { fileUrl, downloadUrl, id: docId, isOwner } = doc;

  const onDelete = () => {
    setDeleting(true);
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Are you sure you want to delete this document?',
    );
    if (confirmed) {
      dispatch(deleteDocument(doc.id))
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
          <FontAwesomeIcon icon={faDownload} color="inherit" title="Download" />
          &nbsp;&nbsp;Download
        </a>
        <a
          href={fileUrl}
          title="Print"
          rel="noreferrer nofollow"
          className="inline-link"
          aria-label="Open this document to print"
        >
          <FontAwesomeIcon icon={faPrint} color="inherit" title="Print" />
          &nbsp;&nbsp;Print
        </a>
      </div>
      <div className="flex-right">
        {isOwner && (
          <>
            <Link to={`/documents/${docId}/prepare`} className="inline-link">
              <FontAwesomeIcon icon={faStamp} color="inherit" title="Prepare" />
              &nbsp;&nbsp;Prepare
            </Link>
            <Link to={`/documents/${docId}/edit`} className="inline-link">
              <FontAwesomeIcon icon={faEdit} color="inherit" title="Edit" />
              &nbsp;&nbsp;Edit
            </Link>
            <button
              className="flat"
              type="button"
              title="Delete document"
              onClick={onDelete}
              disabled={deleting}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                color="inherit"
                title="Delete"
              />
              &nbsp;&nbsp;Delete
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
    id: PropTypes.string,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(ButtonBar);
