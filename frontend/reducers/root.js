import { combineReducers } from 'redux';
import entities from './entities';
import session from './session';
import errors from './errors';
import ui from './ui';

export default combineReducers({
  entities,
  session,
  errors,
  ui,
});
