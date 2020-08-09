import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counterSlice';
const { actions, reducer } = counterSlice;
// const { increment, decrement } = actions

console.log(counterSlice);
export default configureStore({
  reducer: {
    counter: reducer,
  },
});
