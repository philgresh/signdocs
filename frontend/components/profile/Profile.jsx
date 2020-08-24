import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ sig, user }) => {
  return <pre>{JSON.stringify({ sig, user }, null, 2)}</pre>;
};

Profile.propTypes = {};

export default Profile;
