import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { UserPropTypeShape } from '../propTypes';

const splashLinksLeft = [
  {
    to: '/products',
    title: 'Products',
  },
  {
    to: '/solutions',
    title: 'Solutions',
  },
  {
    to: '/devs',
    title: 'Developers',
  },
  {
    to: '/pricing',
    title: 'Pricing',
  },
];

const signedInLinksLeft = [
  {
    to: '/documents',
    title: 'Documents',
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
  const rightNavSignedIn = currentUser && (
    <li>
      <p>Hello, {currentUser.firstName}</p>
      <button onClick={signoutUser} type="button">
        Sign Out
      </button>
    </li>
  );

  const rightNavSignedOut = navBarLinksRight.map(({ to, title, className }) => (
    <li key={to}>
      <NavLink to={to} className={className}>
        {title}
      </NavLink>
    </li>
  ));

  const leftNavSignedIn =
    currentUser &&
    signedInLinksLeft.map((link) => (
      <li key={link.to}>
        <NavLink to={link.to}>{link.title}</NavLink>
      </li>
    ));

  const leftNavSignedOut = splashLinksLeft.map(({ to, title }) => (
    <li key={to}>
      <NavLink to={to}>{title}</NavLink>
    </li>
  ));

  let navLinksRight = rightNavSignedOut;
  let navLinksLeft = leftNavSignedOut;
  let mastheadLinkTo = '/';
  if (currentUser) {
    navLinksRight = rightNavSignedIn;
    navLinksLeft = leftNavSignedIn;
    mastheadLinkTo = '/';
  }

  return (
    <nav>
      <div className="flex-left">
        <h1>
          <Link to={mastheadLinkTo}>SignDocs</Link>
        </h1>
        <ul className="nav-links">{navLinksLeft}</ul>
      </div>
      <div className="flex-right">
        <ul className="nav-links">{navLinksRight}</ul>
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
