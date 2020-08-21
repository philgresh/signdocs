/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileDownload,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';

const expStartRegex = /Date=(\d{8}T\d{6}Z)/;
const expLenRegex = /Expires=(\d+)&/;

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    // eslint-disable-next-line no-console
    console.log('Text copied to clipboard', text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

function extractExpirationDate(signedUrl) {
  const expStart = signedUrl.match(expStartRegex);
  const expLen = signedUrl.match(expLenRegex);
  if (!expStart[1] || !expLen[1]) return -1;
  return moment(expStart[1]).add(expLen[1], 'seconds');
}

function isGoodExpDate(signedUrl) {
  return extractExpirationDate(signedUrl) >= moment();
}

const ButtonBar = ({
  doc,
  currentUser,
  deleteDocument,
  fetchSignedUrl,
  history,
}) => {
  const [deleting, setDeleting] = useState(false);
  // eslint-disable-next-line react/prop-types
  const {
    fileUrl,
    downloadUrl,
    ownerId,
    editorIds,
    id: docId,
    signedUrl,
  } = doc;
  const isOwner = ownerId === currentUser.id;
  // eslint-disable-next-line react/prop-types
  const isEditor = isOwner || editorIds.includes(currentUser.id);

  const alertSignedUrl = (url) => {
    // eslint-disable-next-line no-alert
    const expirationTimeframe = moment(extractExpirationDate(url)).fromNow();
    // eslint-disable-next-line no-alert
    alert(`Url was copied to the clipboard! Expires ${expirationTimeframe}`);
  };

  const onFetchSignedUrl = () => {
    fetchSignedUrl().then((res) => {
      copyToClipboard(res.document.signedUrl);
      alertSignedUrl(res.document.signedUrl);
    });
  };

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

  let signedUrlButtonFunc = onFetchSignedUrl;
  if (signedUrl && isGoodExpDate(signedUrl)) {
    signedUrlButtonFunc = () => {
      copyToClipboard(signedUrl);
      alertSignedUrl(signedUrl);
    };
  }

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
        <>
          <button type="button" className="flat" onClick={signedUrlButtonFunc}>
            Get URL to share
          </button>
          <button
            type="button"
            className="flat warn"
            onClick={onDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </>
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
  fetchSignedUrl: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
};

ButtonBar.defaultProps = {
  doc: {},
};

export default withRouter(ButtonBar);
