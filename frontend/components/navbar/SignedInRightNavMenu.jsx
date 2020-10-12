/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserPropTypeShape } from '../propTypes';

const SignedInRightNavMenu = ({ currentUser, signoutUser }) => {
  const { firstName, lastName } = currentUser;
  const initials = `${firstName[0]}${lastName[0]}`;

  const onMenuClick = () => {
    $('.right-nav-menu ul').toggleClass('hidden');
  };

  return (
    <ul className="nav-links">
      <li className="dropdown">
        <button type="button" onClick={onMenuClick} className="flat dropbtn">
          {initials}
        </button>
        <ul className="dropdown-content">
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li onClick={signoutUser} role="button">
            Sign out
          </li>
        </ul>
      </li>
    </ul>
  );
};

SignedInRightNavMenu.propTypes = {
  currentUser: UserPropTypeShape.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

export default SignedInRightNavMenu;
