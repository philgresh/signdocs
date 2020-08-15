import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SessionForm = ({ errors, formType, processForm, history }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    processForm({ email, password })
      .then(() => {
        history.push('/');
      })
      .fail(() => {
        setPassword('');
        setSubmitting(false);
      });
  };

  const buttonText = formType === 'login' ? 'Log in!' : 'Sign up!';
  const headerText = formType === 'login' ? 'Log in' : 'Sign up';
  const errorsString = errors.join('. ');
  return (
    <div>
      <h1>{headerText}</h1>
      <label htmlFor="email">Username</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="errors" style={{ color: 'darkred' }}>
        {errorsString}
      </p>
      <button type="submit" onClick={handleSubmit} disabled={submitting}>
        {buttonText}
      </button>
    </div>
  );
};

SessionForm.propTypes = {};

export default SessionForm;
