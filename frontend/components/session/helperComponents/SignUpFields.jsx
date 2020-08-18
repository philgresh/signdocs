import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HelperText from './HelperText';
import { getErrors } from '../../../reducers/selectors';

const SignUpFields = ({ isSignUp, handleChange, state, errors }) => {
  const { firstName, lastName } = state;
  if (!isSignUp) return null;

  return (
    <>
      <label htmlFor="firstName">
        First Name
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          required={isSignUp}
          pattern="[a-zA-Z0-9]+"
          minLength={1}
        />
      </label>
      <HelperText field="first_name" errors={errors} />
      <label htmlFor="lastName">
        Last Name
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          required={isSignUp}
          pattern="[a-zA-Z0-9]+"
          minLength={3}
        />
      </label>
      <HelperText field="last_name" errors={errors} />
    </>
  );
};

SignUpFields.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  state: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
};

SignUpFields.defaultProps = {
  errors: {},
};

const mapStateToProps = (state) => ({
  errors: getErrors(state),
});

export default connect(mapStateToProps)(SignUpFields);
