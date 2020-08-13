import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import SignupContainer from '../components/signup/SignupContainer';
import {AuthRoute, ProtectedRoute} from '../utils/routeUtils';

const App = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <Switch>
      <AuthRoute path="/signup" component={SignupContainer} />
        <ProtectedRoute path="/user"></ProtectedRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
