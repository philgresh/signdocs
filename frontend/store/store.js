import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counterSlice';
import sessionReducer from '../reducers/session';
const { actions, reducer } = counterSlice;

// const { increment, decrement } = actions


export default (preloadedState={}) => configureStore({
  preloadedState,
  reducer: {
    counter: reducer,
    session: sessionReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
