/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { HelperText } from '../helperComponents';

const PASSWORD_QUALITY_MIN = 2;
const PASSWORD_LENGTH_MIN = 6;
// From zxcvbn:
// result.score      # Integer from 0-4 (useful for implementing a strength bar)
//   0 # too guessable: risky password. (guesses < 10^3)
//   1 # very guessable: protection from throttled online attacks. (guesses < 10^6)
//   2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
//   3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
//   4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)

const PasswordFields = ({ handleChange, state, isSignUp, receiveErrors }) => {
  const setPasswordWarnings = (warnings = [], suggestions = []) => {
    receiveErrors({ password: { warnings, suggestions } });
  };

  const handlePasswordQualityCheck = (pw) => {
    const analysis = zxcvbn(pw, Object.values(state));
    const { score, feedback } = analysis;
    const len = pw.length;
    const longEnough = len > PASSWORD_LENGTH_MIN;
    const strongEnough = score > PASSWORD_QUALITY_MIN;

    if (len === 0) return setPasswordWarnings([]);

    const warnings = [];
    let suggestions = [];
    if (!longEnough) {
      warnings.push(`must be at least ${PASSWORD_LENGTH_MIN} characters long.`);
    }
    if (!strongEnough && len < 12) suggestions = feedback.suggestions;
    return setPasswordWarnings(warnings, suggestions);
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    if (isSignUp) handlePasswordQualityCheck(e.target.value);
  };

  return (
    <>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <HelperText field="password" path="session.password.warnings" />
      <HelperText
        field="password"
        path="session.password.suggestions"
        prefix=""
        errorClass="suggestion"
      />
      <div className="password-helper-text" />
    </>
  );
};

PasswordFields.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  receiveErrors: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  state: PropTypes.object,
};

export default PasswordFields;
