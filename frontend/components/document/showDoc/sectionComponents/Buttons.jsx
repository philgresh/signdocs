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
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

const InlineLink = ({ url, children }) => (
  <Link to={url} className="inline-link">
    {children}
  </Link>
);

const DisabledInline = ({ children, tooltip }) => (
  <button
    type="button"
    className="flat inline-link disabled tooltip-bottom"
    data-tooltip={tooltip}
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

const DownloadButton = ({ downloadUrl, status }) => (
  <a
    href={downloadUrl}
    download
    className="inline-link"
    aria-label="Download this document"
  >
    <FontAwesomeIcon icon={faDownload} color="inherit" title="Download" />
    &nbsp;&nbsp;{status === 'Final' ? 'Download Final' : 'Download'}
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

const FinalizeButton = ({ status, onFinalize }) => {
  if (status === 'Complete')
    return (
      <button
        className="flat"
        type="button"
        title="Finalize document"
        onClick={onFinalize}
      >
        <FontAwesomeIcon icon={faPaperPlane} color="inherit" title="Finalize" />
        &nbsp;&nbsp;Finalize
      </button>
    );
  return (
    <DisabledInline tooltip="You can finalize the document after all signatories have signed.">
      <FontAwesomeIcon icon={faPaperPlane} color="inherit" title="Finalize" />
      &nbsp;&nbsp;Finalize
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

const PrintButton = ({ fileUrl, status }) => (
  <a
    href={fileUrl}
    title="Print"
    rel="noreferrer nofollow"
    className="inline-link"
    aria-label="Open this document to print"
  >
    <FontAwesomeIcon icon={faPrint} color="inherit" title="Print" />
    &nbsp;&nbsp;{status === 'Final' ? 'Print Final' : 'Print'}
  </a>
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
};
DownloadButton.propTypes = {
  downloadUrl: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
EditButton.propTypes = {
  docId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
FinalizeButton.propTypes = {
  onFinalize: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
PrepareButton.propTypes = {
  docId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
PrintButton.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
InlineLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
};
DisabledInline.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
  tooltip: PropTypes.string,
};

DisabledInline.defaultProps = {
  tooltip: 'Document has already been signed by at least one signatory.',
};

export {
  DeleteButton,
  DownloadButton,
  EditButton,
  FinalizeButton,
  PrintButton,
  PrepareButton,
};
