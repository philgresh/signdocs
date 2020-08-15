import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SessionForm = (props) => {
  const {
    errors,
    formType,
    processForm,
    history,
    generateBob,
    email: propsEmail,
  } = props;
  const [state, setState] = useState({
    email: propsEmail || '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setState({ ...state, [name]: value });
  };

  // const handleDemoUser = (e) => {
  //   debugger;
  //   e.preventDefault();
  //   const bob = generateBob();
  //   setState({ ...bob });
  //   handleSubmit(e);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { ...state };
    if (e.target.name === 'demoBtn') {
      user = generateBob();
    }
    setSubmitting(true);
    processForm(user)
      .then(() => {
        history.push('/');
      })
      .fail(() => {
        setSubmitting(false);
        clearPassword();
      });
  };

  const clearPassword = () =>
    setState((oldState) => ({ ...oldState, password: '' }));

  const isSignUp = formType === 'SIGN_UP';

  const buttonText = isSignUp ? 'Sign up!' : 'Sign in!';
  const headerText = isSignUp ? 'Sign up!' : 'Sign in!';
  const errorsString = errors.join('. ');

  const demoButton = isSignUp ? (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={submitting}
      name="demoBtn"
    >
      Demo User
    </button>
  ) : (
    <span></span>
  );

  const footer = (
    <div className="footer-links">
      {isSignUp ? (
        <p>
          Have an account already? <Link to="/signin">Sign in!</Link>
        </p>
      ) : (
        <>
          <p>
            Don't have an account yet? <Link to="/signup">Sign up!</Link>
          </p>
          <p>
            <Link to="/signin">Forgot my password</Link>
          </p>
        </>
      )}
    </div>
  );

  const { email, password, firstName, lastName } = state;

  return (
    <>
      <h1>{headerText}</h1>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <p className="errors" style={{ color: 'darkred' }}>
          {errorsString}
        </p>
        {demoButton}
        <button type="submit" disabled={submitting}>
          {buttonText}
        </button>
      </form>
      {footer}
    </>
  );
};

SessionForm.propTypes = {};

export default SessionForm;
