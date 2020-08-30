import React from 'react';
import { Link } from 'react-router-dom';
import { UserPropTypeShape } from '../propTypes';

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

FirstSignin.propTypes = {
  user: UserPropTypeShape.isRequired,
};

export default FirstSignin;
