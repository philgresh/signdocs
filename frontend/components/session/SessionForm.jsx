/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import DemoButton from './DemoButton';
import SignUpFields from './SignUpFields';
import PasswordFields from './PasswordFields';
import { HelperText } from '../helperComponents';

const SessionForm = (props) => {
  const {
    clearErrors,
    formType,
    processForm,
    history,
    generateDemo,
    email: propsEmail,
    receiveErrors,
  } = props;
  const [state, setState] = useState({
    email: propsEmail || '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setState({ ...state, [name]: value });
  };

  const clearPassword = () =>
    setState((oldState) => ({ ...oldState, password: '' }));

  const handleSubmit = (e, user = state) => {
    e.preventDefault();

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

  const handleDemoUser = (e) => {
    setSubmitting(true);
    e.preventDefault();
    e.persist();
    const demo = generateDemo();
    setState({ ...demo });
    setTimeout(() => handleSubmit(e, demo), 750);
  };

  let buttonText = 'Sign in';
  let buttonTextSubmitting = 'Signing in...';
  let headerText = <h1>Please sign in to your account</h1>;
  let helmetText = 'SignDocs - Sign in';

  const isSignUp = formType === 'SIGN_UP';

  if (isSignUp) {
    headerText = (
      <>
        <h1>Try DocuSign free for 30 days</h1>
        <p>
          <strong>No obligation, no credit card required</strong>
        </p>
      </>
    );
    buttonText = 'Get started';
    buttonTextSubmitting = 'Getting you started...';
    helmetText = 'SignDocs - Sign up for free';
  }

  const footer = (
    <div className="footer-links">
      {isSignUp ? (
        <p>
          Have an account already? <Link to="/signin">Sign in</Link>
        </p>
      ) : (
        <>
          <p>
            Don&apos;t have an account yet?{' '}
            <Link to="/signup">Sign up for free</Link>
          </p>
          <p>
            <Link to="/forgotpassword">Forgot my password</Link>
          </p>
        </>
      )}
    </div>
  );

  const { email } = state;

  return (
    <div className="session-form">
      <Helmet>
        <title>{`${helmetText}`}</title>
      </Helmet>
      {headerText}
      <form onSubmit={handleSubmit}>
        <SignUpFields
          state={state}
          handleChange={handleChange}
          isSignUp={isSignUp}
          HelperText={HelperText}
        />
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
        <HelperText field="email" path="session.password" />
        <PasswordFields
          isSignUp={isSignUp}
          handleChange={handleChange}
          state={state}
          receiveErrors={receiveErrors}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? buttonTextSubmitting : buttonText}
        </button>
        <DemoButton
          isSignUp={isSignUp}
          handleSubmit={handleDemoUser}
          submitting={submitting}
        />
      </form>
      {footer}
    </div>
  );
};

SessionForm.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  processForm: PropTypes.func.isRequired,
  receiveErrors: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  email: PropTypes.string,
  generateDemo: PropTypes.func.isRequired,
};

SessionForm.defaultProps = {
  email: '',
};

export default SessionForm;
