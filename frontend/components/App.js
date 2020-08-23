import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import { Signin, Signup } from './session';
import { CreateDocContainer, EditDocContainer } from './document/createEditDoc';
import { EditSignatureContainer, SigRedirect } from './signature';
import DocsIndex from './document/indexDocs';
import DocDetails from './document/showDoc';
import Footer from './footer';
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
              <AuthRoute path="/signin" component={Signin} />
              <AuthRoute path="/signup" component={Signup} />
              <ProtectedRoute path="/user" component={Signin} />
              {/* <ProtectedRoute
                exact
                path="/signature"
                component={EditSignatureContainer}
              /> */}
              <ProtectedRoute
                path="/signature/:userId"
                component={EditSignatureContainer}
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
              <ProtectedRoute path="/documents/:docId" component={DocDetails} />
              <Route path="/">
                <Home />
              </Route>
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
