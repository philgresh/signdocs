import { combineReducers } from 'redux';
import {sessionErrorsReducer} from './sessionReducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
});

// Selectors
export const getErrors = (state, type = 'session') => state.errors[type] || [];

export default errorsReducer;
