import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import SigninContainer from './session/SigninFormContainer';
import SignupContainer from './session/SignupFormContainer';
import DocsIndexContainer from './document/DocsIndexContainer';
import DocDetailsContainer from './document/DocDetailsContainer';
import { AuthRoute, ProtectedRoute } from '../utils/route';

const App = () => {
  return (
    <HashRouter>
      <header>
        <Navbar />
      </header>
      <Switch>
        <AuthRoute path="/signin" component={SigninContainer} />
        <AuthRoute path="/signup" component={SignupContainer} />
        <ProtectedRoute path="/user" component={SigninContainer} />
        <ProtectedRoute
          path="/documents"
          exact
          component={DocsIndexContainer}
        />
        <ProtectedRoute
          path="/documents/:docId"
          component={DocDetailsContainer}
        />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
