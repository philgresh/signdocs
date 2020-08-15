import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './components/App';
import { entitiesInitialState } from './reducers/entitiesReducer';
import { createNewUser, signinUser, signoutUser } from './actions/session';
import * as serviceWorker from './serviceWorker';

function setPreloadedState(currentUser) {
  return {
    session: {
      id: currentUser.id,
    },
    entities: {
      ...entitiesInitialState,
      users: {
        [currentUser.id]: currentUser,
      },
    },
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  let preloadedState;
  if (window.currentUser) {
    preloadedState = setPreloadedState(window.currentUser);
    window.currentUser = undefined;
  }
  const store = configureStore(preloadedState);

  // TESTING
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.createNewUser = createNewUser;
  window.signinUser = signinUser;
  window.signoutUser = signoutUser;
  // TESTING

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    rootEl,
  );

  // TODO
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
