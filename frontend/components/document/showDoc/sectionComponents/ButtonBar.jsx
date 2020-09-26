import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';
import { deleteDocument } from '../../../../actions/document';
import {
  DownloadButton,
  PrintButton,
  PrepareButton,
  EditButton,
  DeleteButton,
} from './Buttons';

const ButtonBar = ({ doc, history }) => {
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line react/prop-types
  const { fileUrl, downloadUrl, id: docId, isOwner, status } = doc;

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
    <div className="action-buttons">
      <div className="flex-item-left">
        <DownloadButton downloadUrl={downloadUrl} />
        <PrintButton fileUrl={fileUrl} />
      </div>
      <div className="flex-right">
        {isOwner && (
          <>
            <PrepareButton docId={docId} status={status} />
            <EditButton docId={docId} status={status} />
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
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(ButtonBar);
