import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import { Signin, Signup } from './session';
import { CreateDocContainer, EditDocContainer } from './document/createEditDoc';
import ProfileContainer from './profile/ProfileContainer';
import DocsIndex from './document/indexDocs';
import DocDetails from './document/showDoc';
import PrepareDocContainer from './document/prepDoc';
import SignDocContainer from './document/signDoc';
import Footer from './footer';
import FourOhFour from './_404/FourOhFour';
import { AuthRoute, ProtectedRoute } from '../utils/route';

const App = () => {
  return (
    <HashRouter>
      <div id="page-container">
        <div id="content-wrap">
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <ProtectedRoute
                path="/profile"
                exact
                component={ProfileContainer}
              />
              <ProtectedRoute path="/documents" exact component={DocsIndex} />
              <ProtectedRoute
                path="/documents/new"
                exact
                component={CreateDocContainer}
              />
              <ProtectedRoute
                path="/documents/:docId/edit"
                component={EditDocContainer}
              />
              <ProtectedRoute
                path="/documents/:docId/prepare"
                component={PrepareDocContainer}
              />
              <ProtectedRoute
                path="/documents/:docId/sign"
                component={SignDocContainer}
              />
              <ProtectedRoute path="/documents/:docId" component={DocDetails} />
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/signin" component={Signin} />
              <AuthRoute exact path="/signup" component={Signup} />
              <Route path="/404" component={FourOhFour} />
              <Redirect to="/404" />
            </Switch>
          </main>
        </div>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
