import { combineReducers } from 'redux';
import entities from './entities';
import session from './session';
import errors from './errors';

export default combineReducers({
  entities,
  session,
  errors,
});
