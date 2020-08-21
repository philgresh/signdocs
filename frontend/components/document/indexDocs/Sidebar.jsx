import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = () => {
  return (
    <div className="index-sidebar">
      <Link to="/documents/new" className="a-as-button">
        Start now
      </Link>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
