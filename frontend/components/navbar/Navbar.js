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
    to: '/sales',
    title: 'Contact Sales',
    className: 'btn-text',
  },
  {
    to: '/signin',
    title: 'Sign In',
    className: 'btn-contained',
  },
];

const Navbar = (props) => {
  return (
    <nav>
      <div className="flex-left">
        <h1>SignDocs</h1>
        <ul className="nav-links">
          {navBarLinksLeft.map(({ to, title }) => (
            <li key={to}>
              <NavLink to={to} component={NavLinkButton}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-right">
        <ul className="nav-links">
          {navBarLinksRight.map(({ to, title, className }) => (
            <li key={to}>
              <NavLink to={to} className={className} component={NavLinkButton}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const NavLinkButton = React.forwardRef(({ children, ...rest }, ref) => (
  <button
  type="button"
  className={`btn-navlink ${rest.className ? rest.className : ''}`}
  {...rest}
  >
    <a ref={ref}>{children}</a>
  </button>
));

Navbar.propTypes = {};

export default Navbar;
