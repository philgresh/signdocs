import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { signedIn } from '../reducers/session';

const mapStateToProps = (state) => ({
  signedIn: signedIn(state),
});

const AUTH_REDIRECT_PATH = '/';
const PROTECTED_REDIRECT_PATH = '/signup';

const Auth = ({ component: Component, path, signedIn }) => (
  <Route
    path={path}
    render={(props) =>
      signedIn ? <Redirect to={AUTH_REDIRECT_PATH} /> : <Component {...props} />
    }
  />
);

const Protected = ({ component: Component, path, signedIn }, ...rest) => (
  <Route
    path={path}
    render={(props) =>
      signedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={PROTECTED_REDIRECT_PATH} {...rest} {...props} />
      )
    }
  />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
