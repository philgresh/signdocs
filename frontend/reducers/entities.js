import { combineReducers } from 'redux';
import documents from './documents';
import users from './users';

export default combineReducers({
  users,
  documents,
});
