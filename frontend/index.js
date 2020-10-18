import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

function setPreloadedState(currentUser) {
  return {
    session: {
      id: currentUser.id,
    },
    entities: {
      users: {
        [currentUser.id]: currentUser,
      },
    },
    ui: {
      modal: { open: false },
    },
  };
}

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState;
  if (window.currentUser) {
    preloadedState = setPreloadedState(window.currentUser);
    window.currentUser = undefined;
  }
  const store = configureStore(preloadedState);

  // TESTING
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  // TESTING

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );

  // TODO
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register();
});
