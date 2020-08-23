import { combineReducers } from 'redux';
import documents from './documents';
import signatures from './signatures';
import users from './users';

export default combineReducers({
  users,
  documents,
  signatures,
});
