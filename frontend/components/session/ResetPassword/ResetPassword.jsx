/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { string, object, ref } from 'yup';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { HelperText } from '../../helperComponents';

const schema = object().shape({
  password: string().min(6).max(64).required(),
  passwordConfirmation: string().oneOf(
    [ref('password'), null],
    'Passwords must match',
  ),
  resetToken: string().required(),
});

const ResetPassword = (props) => {
  const {
    submitResetPassword,
    receiveErrors,
    clearOutErrors,
    history,
    resetToken,
  } = props;
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      clearOutErrors();
    };
  }, []);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) =>
    setPasswordConfirmation(e.target.value);

  const submit = () => {
    submitResetPassword({ password, passwordConfirmation, resetToken })
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.reset);
        history.push('/signin');
      })
      .fail((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    schema
      .validate({ password, passwordConfirmation, resetToken })
      .then(() => submit())
      .catch((err) => {
        console.error(err);
        receiveErrors(err);
      })
      .finally(() => setSubmitting(false));
  };

  const buttonText = 'Reset';
  const buttonTextSubmitting = 'Resetting...';
  const headerText = <h1>Reset your password</h1>;
  const helmetText = 'SignDocs - Reset password';

  return (
    <div className="session-form">
      <Helmet>
        <title>{helmetText}</title>
      </Helmet>
      {headerText}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <label htmlFor="passwordConfirmation">
          Confirm Password
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handleConfirmPasswordChange}
            required
          />
        </label>
        <HelperText field="Password Reset" path="session.reset" />
        <button type="submit" disabled={submitting}>
          {submitting ? buttonTextSubmitting : buttonText}
        </button>
      </form>
    </div>
  );
};

ResetPassword.propTypes = {
  submitResetPassword: PropTypes.func.isRequired,
  receiveErrors: PropTypes.func.isRequired,
  clearOutErrors: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetToken: PropTypes.string.isRequired,
};

export default ResetPassword;
