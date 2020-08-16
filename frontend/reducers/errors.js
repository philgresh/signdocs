import { combineReducers } from 'redux';
import { sessionErrors } from './session';

export default combineReducers({
  session: sessionErrors,
});
