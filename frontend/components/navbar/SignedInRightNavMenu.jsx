import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserPropTypeShape } from '../propTypes';

const SignedInRightNavMenu = ({ currentUser, signoutUser }) => {
  const { firstName, lastName } = currentUser;
  const initials = firstName[0] + lastName[0];

  const onMenuClick = () => {
    $('.right-nav-menu ul').toggleClass('hidden');
  };

  // <div class="dropdown">
  //   <button class="dropbtn">Dropdown</button>
  //   <div class="dropdown-content">
  //     <a href="#">Link 1</a>
  //     <a href="#">Link 2</a>
  //     <a href="#">Link 3</a>
  //   </div>
  // </div> 

  return (
    <li className="dropdown">
      <button type="button" onClick={onMenuClick} className="flat dropbtn">
        {initials}
      </button>
      <ul className="dropdown-content">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button type="button" onClick={signoutUser} className="flat">
            Sign out
          </button>
        </li>
      </ul>
    </li>
  );
};

SignedInRightNavMenu.propTypes = {
  currentUser: UserPropTypeShape.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

export default SignedInRightNavMenu;
