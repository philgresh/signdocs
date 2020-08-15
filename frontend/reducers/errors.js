import { combineReducers } from 'redux';
import { sessionErrors } from './session';

export default combineReducers({
  session: sessionErrors,
});

// Selectors
export const getErrors = (state, type = 'session') => state.errors[type] || [];
