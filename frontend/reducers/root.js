import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import sessionReducer from './session';

export default combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
});
