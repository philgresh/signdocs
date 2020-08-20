import React from 'react';
import PropTypes from 'prop-types';

const TitleBar = ({ title }) => {
  return (
    <div className="flex-row-container flex-between-baseline">
      <h2 className="flex-item-left">{title}</h2>
      <p className="flex-item-right">(STATUS GOES HERE)</p>
    </div>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleBar;
