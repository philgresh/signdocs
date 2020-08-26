export const RECEIVE_CONTENT_FIELD = 'RECEIVE_CONTENT_FIELD';
export const REMOVE_CONTENT_FIELD = 'REMOVE_CONTENT_FIELD';

export const receiveContentField = (contentField) => ({
  type: RECEIVE_CONTENT_FIELD,
  payload: contentField,
});

export const removeContentField = (contentFieldId) => ({
  type: RECEIVE_CONTENT_FIELD,
  payload: contentFieldId,
});
