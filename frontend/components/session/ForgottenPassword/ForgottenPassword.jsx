/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { string, object } from 'yup';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { HelperText } from '../../helperComponents';

const schema = object().shape({
  email: string().email().required(),
});

const ForgottenPassword = (props) => {
  const {
    sendForgottenPasswordEmail,
    receiveErrors,
    clearOutErrors,
    history,
  } = props;
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      clearOutErrors();
    };
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (value === '') clearOutErrors();
  };

  const submit = () => {
    sendForgottenPasswordEmail(email)
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.forgotten);
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
      .validate({ email })
      .then(() => submit())
      .catch((err) => {
        console.error(err);
        receiveErrors({ email: ['is invalid.'] });
      })
      .finally(() => setSubmitting(false));
  };

  const buttonText = 'Send reset token';
  const buttonTextSubmitting = 'Sending you an email...';
  const headerText = <h1>Reset your password</h1>;
  const helmetText = 'SignDocs - Reset password';

  return (
    <div className="session-form">
      <Helmet>
        <title>{`${helmetText}`}</title>
      </Helmet>
      {headerText}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <HelperText field="email" path="session.email" />
        <button type="submit" disabled={submitting}>
          {submitting ? buttonTextSubmitting : buttonText}
        </button>
      </form>
    </div>
  );
};

ForgottenPassword.propTypes = {
  sendForgottenPasswordEmail: PropTypes.func.isRequired,
  receiveErrors: PropTypes.func.isRequired,
  clearOutErrors: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ForgottenPassword;
