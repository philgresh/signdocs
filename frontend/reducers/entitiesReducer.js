import { combineReducers } from 'redux';
import documentsReducer from './documentsReducer';
import usersReducer from './users';

export default combineReducers({
  users: usersReducer,
  documents: documentsReducer,
});
