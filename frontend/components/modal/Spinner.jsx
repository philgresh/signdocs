import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ message }) => {
  return (
    <div className="loader">
      <p>{message}</p>
    </div>
  );
};

Spinner.propTypes = {
  message: PropTypes.string,
};

Spinner.defaultProps = {
  message: 'Loading...',
};

export default Spinner;
