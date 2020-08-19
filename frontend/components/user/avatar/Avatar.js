import React from 'react';
import PropTypes from 'prop-types';
import { UserPropTypeShape } from '../../propTypes';

const Avatar = ({ user, height }) => {
  const { imageTag, firstName, lastName } = user;

  const altText = `${firstName} ${lastName}`;

  return (
    <div className="avatar">
      <img src={imageTag} alt={altText} height={height} />
    </div>
  );
};

Avatar.propTypes = {
  user: UserPropTypeShape.isRequired,
  height: PropTypes.number,
};

Avatar.defaultProps = {
  height: 100,
};
export default Avatar;
