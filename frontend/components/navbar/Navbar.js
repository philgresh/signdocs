import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { UserPropTypeShape } from '../propTypes';
import SignedInRightNavMenu from './SignedInRightNavMenu';

const signedInLinksLeft = [
  {
    to: '/documents',
    title: 'Documents',
  },
  {
    to: '/profile',
    title: 'Profile',
  },
];

const navBarLinksRight = [
  {
    to: '/signin',
    title: 'Sign In',
    className: 'btn-text',
  },
  {
    to: '/signup',
    title: 'Sign Up',
    className: 'btn-contained',
  },
];

const Navbar = ({ currentUser, signoutUser }) => {
  const RightNavSignedOut = () => (
    <ul className="nav-links">
      {navBarLinksRight.map(({ to, title, className }) => (
        <li key={to}>
          <NavLink to={to} className={className}>
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const LeftLinks = ({ links }) =>
    links.map((link) => (
      <li key={link.to}>
        <NavLink to={link.to}>{link.title}</NavLink>
      </li>
    ));

  let navLinksLeft = [];
  let mastheadLinkTo = '/';
  if (currentUser) {
    mastheadLinkTo = '/';
    navLinksLeft = signedInLinksLeft;
  }

  return (
    <nav>
      <div className="flex-container-left">
        <h1>
          <Link to={mastheadLinkTo}>SignDocs</Link>
        </h1>
        <ul className="nav-links">
          <LeftLinks links={navLinksLeft} />
        </ul>
      </div>
      <div className="flex-container-right">
        {currentUser ? (
          <SignedInRightNavMenu
            currentUser={currentUser}
            signoutUser={signoutUser}
          />
        ) : (
          <RightNavSignedOut />
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  currentUser: UserPropTypeShape,
  signoutUser: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  currentUser: null,
};

export default Navbar;
