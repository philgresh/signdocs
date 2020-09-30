import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faPrint,
  faEdit,
  faTrashAlt,
  faStamp,
} from '@fortawesome/free-solid-svg-icons';

const InlineLink = ({ url, children }) => (
  <Link to={url} className="inline-link">
    {children}
  </Link>
);

const DisabledInline = ({ children }) => (
  <button
    type="button"
    className="flat inline-link disabled tooltip-bottom"
    data-tooltip="Document has already been signed by at least one signatory."
  >
    {children}
  </button>
);

const DeleteButton = ({ onDelete, deleting }) => (
  <button
    className="flat"
    type="button"
    title="Delete document"
    onClick={onDelete}
    disabled={deleting}
  >
    <FontAwesomeIcon icon={faTrashAlt} color="inherit" title="Delete" />
    &nbsp;&nbsp;Delete
  </button>
);

const DownloadButton = ({ downloadUrl }) => (
  <a
    href={downloadUrl}
    download
    className="inline-link"
    aria-label="Download this document"
  >
    <FontAwesomeIcon icon={faDownload} color="inherit" title="Download" />
    &nbsp;&nbsp;Download
  </a>
);
const EditButton = ({ docId, status }) => {
  const url = `/documents/${docId}/edit`;
  if (status === 'Being Prepared')
    return (
      <InlineLink url={url}>
        <FontAwesomeIcon icon={faEdit} color="inherit" title="Edit" />
        &nbsp;&nbsp;Edit
      </InlineLink>
    );
  return (
    <DisabledInline>
      <FontAwesomeIcon icon={faEdit} color="inherit" title="Edit" />
      &nbsp;&nbsp;Edit
    </DisabledInline>
  );
};

const PrepareButton = ({ docId, status }) => {
  const url = `/documents/${docId}/prepare`;
  if (status === 'Being Prepared')
    return (
      <InlineLink url={url}>
        <FontAwesomeIcon icon={faStamp} color="inherit" title="Prepare" />
        &nbsp;&nbsp;Prepare
      </InlineLink>
    );
  return (
    <DisabledInline>
      <FontAwesomeIcon icon={faStamp} color="inherit" title="Prepare" />
      &nbsp;&nbsp;Prepare
    </DisabledInline>
  );
};

const PrintButton = ({ fileUrl }) => (
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
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
};
DownloadButton.propTypes = {
  downloadUrl: PropTypes.string.isRequired,
};
EditButton.propTypes = {
  docId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
PrepareButton.propTypes = {
  docId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
PrintButton.propTypes = {
  fileUrl: PropTypes.string.isRequired,
};
InlineLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
DisabledInline.propTypes = {
  children: PropTypes.func.isRequired,
};

export { DownloadButton, PrintButton, PrepareButton, EditButton, DeleteButton };
