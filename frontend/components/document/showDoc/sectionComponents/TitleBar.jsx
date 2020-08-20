import React from 'react';
import PropTypes from 'prop-types';

const TitleBar = ({ title }) => {
  return (
    <div className="doc-show title-bar">
      <h2>{title}</h2>
      <p>(STATUS GOES HERE)</p>
    </div>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleBar;
