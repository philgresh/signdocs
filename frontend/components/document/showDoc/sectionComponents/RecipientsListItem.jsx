import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTasks } from '@fortawesome/free-solid-svg-icons';
import { UserPropTypeShape } from '../../../propTypes';

const RecipientsListItem = ({
  index,
  status,
  user: { firstName, lastName, email },
}) => {
  const userNameText = `${firstName} ${lastName}`;
  return (
    <>
      <div className="grid-row-index">{index}</div>
      <div className="grid-row-status">
        <FontAwesomeIcon icon={faSpinner} color="gray" />
      </div>
      <div className="grid-row-user">
        <div>
          <strong>{userNameText}</strong>
        </div>
        <div>
          <p>{email}</p>
        </div>
      </div>
      <div className="grid-row-signed-icon">
        <FontAwesomeIcon icon={faTasks} color="gray" />
      </div>
      <div className="grid-row-signed-at">
        <div>
          <strong>Not yet signed</strong>
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
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

RecipientsListItem.defaultProps = {
  status: 'In Progress',
};

export default RecipientsListItem;
