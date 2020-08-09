import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
// import { receiveGreenTea, receiveTea, fetchAllTeas, createTea } from './actions/tea_actions';
// import * as TeaAPIUtil from './utils/tea_api_utils';

document.addEventListener('DOMContentLoaded', () => {

  // FOR TESTING
  window.store = store;
  // FOR TESTING

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Root />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
