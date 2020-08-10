import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';

const App = (props) => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route path="/signin"></Route>
        <Route path="/user"></Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {};

export default App;
