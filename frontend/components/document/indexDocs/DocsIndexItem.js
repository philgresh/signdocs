/* eslint-disable react/require-default-props */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';
import { getUserDetails } from '../../../reducers/selectors';

const namify = (user) => `${user.firstName} ${user.lastName}`;
const getUser = (userId) => (state) => state.entities.users[userId];
const mapEditors = (editorId) => useSelector(getUser(editorId));

const RecipientsText = ({ editorIds }) => {
  const editors = editorIds.map(mapEditors);

  return (
    <div className="docs-index-recipients">
      {editorIds.length ? (
        <>
          To:&nbsp;<span>{namify(editors.shift())}</span>
          {editors.map((e) => (
            <p key={e.id}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{namify(e)}
            </p>
          ))}
        </>
      ) : (
        <>No recipients yet</>
      )}
    </div>
  );
};

RecipientsText.propTypes = {
  editorIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const DocsIndexItem = ({ doc, currentUser }) => {
  // if (!doc || Object.keys(doc).length === 0) return <div />;

  const { id: docId, title, updatedAt, ownerId, editorIds } = doc;
  const ownerDetails = useSelector(getUserDetails(ownerId));

  const isOwner = ownerDetails.id === currentUser.id;

  const updatedAtText = moment(updatedAt).format('M/D/YYYY');
  const ownerName = namify(ownerDetails);
  const status = doc.status || 'Need to sign';
  let statusLink = status;
  if (status === 'Need to sign') {
    statusLink = <Link to={`/documents/${docId}/sign`}>{status}</Link>;
  }

  return (
    <Fragment key={docId}>
      <div data-id={docId}>&nbsp;</div>
      <div className="docs-index-subject">
        <Link to={`/documents/${docId}`}>
          <div className="docs-index-title">{title}</div>
        </Link>
        {isOwner ? (
          <RecipientsText editorIds={editorIds} />
        ) : (
          <div className="docs-index-owner">From:&nbsp;{ownerName}</div>
        )}
      </div>
      <div>{statusLink}</div>
      <div>
        <time dateTime={updatedAt}>{updatedAtText}</time>
        <br />
        <div> {moment(updatedAt).format('H:mma')}</div>
      </div>
      <div>&nbsp;</div>
    </Fragment>
  );
};

DocsIndexItem.propTypes = {
  doc: DocPropTypeShape.isRequired,
  currentUser: UserPropTypeShape.isRequired,
  // // eslint-disable-next-line react/forbid-prop-types
  // history: PropTypes.object,
};

export default DocsIndexItem;
