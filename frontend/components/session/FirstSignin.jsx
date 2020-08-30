import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FirstSignin = ({ user }) => {
  return (
    <div>
      <h2>Welcome {user.firstName ?? ''}!</h2>
      <div>
        <p>
          We&apos;ve auto-generated a signature for you to use, but feel free to
          change it <Link to="/profile">here</Link>.
        </p>
      </div>
    </div>
  );
};

FirstSignin.propTypes = {};

export default FirstSignin;
