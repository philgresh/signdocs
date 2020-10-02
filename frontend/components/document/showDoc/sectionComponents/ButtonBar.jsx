import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';
import { deleteDocument, finalizeDocument } from '../../../../actions/document';
import {
  DeleteButton,
  DownloadButton,
  EditButton,
  FinalizeButton,
  PrepareButton,
  PrintButton,
} from './Buttons';

const ButtonBar = ({ doc, history }) => {
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line react/prop-types
  const { fileUrl, downloadUrl, id: docId, isOwner, status } = doc;

  const onDelete = () => {
    setDeleting(true);
    // TODO: Add modal confirmation
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

  const onFinalize = () => {
    dispatch(finalizeDocument(doc.id)).then(() => window.location.reload());
  };

  const notFinal = status !== 'Final';

  return (
    <div className="action-buttons">
      <div className="flex-item-left">
        <DownloadButton downloadUrl={downloadUrl} />
        <PrintButton fileUrl={fileUrl} />
      </div>
      <div className="flex-right">
        {isOwner && notFinal && (
          <>
            <PrepareButton docId={docId} status={status} />
            <EditButton docId={docId} status={status} />
            <FinalizeButton
              docId={docId}
              status={status}
              onFinalize={onFinalize}
            />
            <DeleteButton onDelete={onDelete} deleting={deleting} />
          </>
        )}
      </div>
    </div>
  );
};

ButtonBar.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    id: PropTypes.string,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

ButtonBar.defaultProps = {
  doc: {
    id: '',
    editors: [],
    owner: {},
  },
};

export default withRouter(ButtonBar);
