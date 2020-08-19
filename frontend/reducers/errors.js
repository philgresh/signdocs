import { combineReducers } from 'redux';
import { sessionErrors } from './session';
import { documentsErrors } from './documents';

export default combineReducers({
  session: sessionErrors,
  documents: documentsErrors,
});
