import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import App from './components/App';
import { entitiesInitialState } from './reducers/entities';
import { sessionInitialState } from './reducers/session';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = setPreloadedState(window.currentUser);
    window.currentUser = undefined;
  }
  const store = configureStore(preloadedState);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    rootEl
  );

  // TODO
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});

function setPreloadedState(currentUser) {
  return {
    session: {
      ...sessionInitialState,
      currentUser: currentUser.id,
    },
    entities: {
      ...entitiesInitialState,
      users: {
        [currentUser.id]: currentUser,
      },
    },
  };
}

