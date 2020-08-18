/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import HelperText from './HelperText';

const PASSWORD_QUALITY_MIN = 2;
const PASSWORD_LENGTH_MIN = 6;
// From zxcvbn:
// result.score      # Integer from 0-4 (useful for implementing a strength bar)
//   0 # too guessable: risky password. (guesses < 10^3)
//   1 # very guessable: protection from throttled online attacks. (guesses < 10^6)
//   2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
//   3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
//   4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)

const PasswordFields = ({ password, handleChange, state, isSignUp }) => {
  const [passwordWarnings, setPasswordWarnings] = useState({});

  const acceptablePasswordStrength = (score, length) => {
    if (!isSignUp || length === 0) return true;
    if (length > PASSWORD_LENGTH_MIN || score > PASSWORD_QUALITY_MIN) {
      return true;
    }
    return false;
  };

  const handlePasswordQualityCheck = (pw) => {
    const analysis = zxcvbn(pw, Object.values(state));
    // console.log(analysis);
    const { score } = analysis;
    const len = pw.length;
    if (!acceptablePasswordStrength(score, len)) {
      // setPasswordWarnings({ feedback, score });
      setPasswordWarnings({ password: [`strength is ${score}`] });
    } else {
      setPasswordWarnings({});
    }
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    handlePasswordQualityCheck(e.target.value);
  };

  return (
    <>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <HelperText field="password" errors={{ password: passwordWarnings }} />
      <div className="password-helper-text" />
    </>
  );
};

PasswordFields.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  state: PropTypes.object,
};

export default PasswordFields;
