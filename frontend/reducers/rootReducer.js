import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
});