import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink, Link } from 'react-router-dom';

const navBarLinksLeft = [
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
  const signedIn = currentUser ? (
    <div>
      <p>Hello, {currentUser.username}</p>
      <button onClick={signoutUser}>Sign Out</button>
    </div>
  ) : <div></div>

  const signedOut = (
    <div>
      <Link className="btn" to="/signup">
        Sign Up
      </Link>
      <Link className="btn" to="/login">
        Log In
      </Link>
    </div>
  );

  return (
    <nav>
      <div className="flex-left">
        <h1>SignDocs</h1>
        <ul className="nav-links">
          {navBarLinksLeft.map(({ to, title }) => (
            <li key={to}>
              <NavLink to={to}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-right">
        <ul className="nav-links">
          {navBarLinksRight.map(({ to, title, className }) => (
            <li key={to}>
              <NavLink to={to} className={className}>
                {title}
              </NavLink>
            </li>
          ))}
          {signedIn}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
