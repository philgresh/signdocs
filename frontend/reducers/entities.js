import { combineReducers } from 'redux';
import contentFields from './contentFields';
import documents from './documents';
import signatures from './signatures';
import users from './users';

export default combineReducers({
  contentFields,
  documents,
  signatures,
  users,
});
