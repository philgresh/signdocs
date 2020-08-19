// import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line max-len
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/root';

export default (preloadedState = {}) =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
