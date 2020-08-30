import { combineReducers } from 'redux';
import { sessionErrors } from './session';
import { documentsErrors } from './documents';
import { signaturesErrors } from './signatures';
import { contentFieldErrors } from './contentFields';

export default combineReducers({
  session: sessionErrors,
  documents: documentsErrors,
  signatures: signaturesErrors,
  contentFields: contentFieldErrors,
});
