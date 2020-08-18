import React from 'react';
import PropTypes from 'prop-types';

const DemoButton = ({ isSignUp, handleSubmit, submitting }) => {
  if (!isSignUp) return null;
  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={submitting}
      name="demoBtn"
    >
      Demo User
    </button>
  );
};

DemoButton.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default DemoButton;
