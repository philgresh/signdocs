import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserPropTypeShape } from '../../../propTypes';
import { getCurrentUser } from '../../../../reducers/selectors';

const RecipientsListItem = ({
  index,
  status,
  user: { id: userId, firstName, lastName, email },
}) => {
  const userNameText = `${firstName} ${lastName}`;
  const currentUser = useSelector(getCurrentUser);
  const { docId } = useParams();
  const isMe = currentUser.id === userId;

  return (
    <>
      <div className="grid-row-index">{index}</div>
      <div className="grid-row-status">
        {/* <FontAwesomeIcon icon={faSpinner} color="gray" /> */}
      </div>
      <div className="grid-row-user">
        <div>
          <strong>
            {/* <Link to={`/user/${userId}`}>{userNameText}</Link> */}
            {userNameText}
          </strong>
        </div>
        <div>
          <p>{email}</p>
        </div>
      </div>
      <div className="grid-row-signed-icon">
        {/* <FontAwesomeIcon icon={faTasks} color="gray" /> */}
        <FontAwesomeIcon icon={faTimes} color="gray" />
      </div>
      <div className="grid-row-signed-at">
        <div>
          <strong>
            {isMe && status === 'In Progress' ? (
              <Link to={`/documents/${docId}/sign`}>Not yet signed</Link>
            ) : (
              'Not yet signed'
            )}
          </strong>
        </div>
        <div>
          <p>{/* Signed date goes here */}</p>
        </div>
        <div>
          <p>{/* Signed location goes here */}</p>
        </div>
      </div>
    </>
  );
};

RecipientsListItem.propTypes = {
  index: PropTypes.number.isRequired,
  status: PropTypes.string,
  user: PropTypes.shape({
    ...UserPropTypeShape,
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

RecipientsListItem.defaultProps = {
  status: 'In Progress',
};

export default RecipientsListItem;
