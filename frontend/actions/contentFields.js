import * as APIUtil from '../utils/contentField';

export const RECEIVE_CONTENT_FIELD = 'RECEIVE_CONTENT_FIELD';
export const REMOVE_CONTENT_FIELD = 'REMOVE_CONTENT_FIELD';
export const RECEIVE_CONTENT_FIELD_ERROR = 'RECEIVE_CONTENT_FIELD_ERROR';

export const receiveContentField = (contentField, oldId = null) => ({
  type: RECEIVE_CONTENT_FIELD,
  payload: contentField,
  oldId,
});

export const removeContentField = (contentFieldId) => ({
  type: REMOVE_CONTENT_FIELD,
  payload: contentFieldId,
});

export const receiveError = (err) => ({
  type: RECEIVE_CONTENT_FIELD_ERROR,
  payload: err,
});

export const createContentField = (cfData) => (dispatch) => {
  dispatch(receiveContentField(cfData));
  const oldId = cfData.id;
  return APIUtil.createContentField(cfData)
    .then((res) => {
      const newCF = { ...cfData, ...res };
      dispatch(receiveContentField(newCF, oldId));
      dispatch(removeContentField(oldId));
      return res;
    })
    .fail((err) => {
      console.error(err);
      dispatch(receiveError(err));
      dispatch(removeContentField(cfData.id));
      return err;
    });
};

export const updateContentField = (cfData) => (dispatch) => {
  dispatch(receiveContentField(cfData));
  APIUtil.updateContentField(cfData)
    .then((res) => {
      const newCF = { ...cfData, ...res };
      dispatch(receiveContentField(newCF));
      return res;
    })
    .fail((err) => {
      console.error(err);
      dispatch(receiveError(err));
      return err;
    });
};

export const deleteContentField = (cfId) => (dispatch) =>
  APIUtil.deleteContentField(cfId)
    .then(() => dispatch(removeContentField(cfId)))
    .fail((err) => {
      console.error(err);
      dispatch(receiveError(err));
    });

export const signContentField = (cfId) => (dispatch) =>
  APIUtil.signContentField(cfId)
    .then((cf) => {
      dispatch(receiveContentField(cf));
      return cf;
    })
    .fail((err) => {
      console.error(err);
      dispatch(receiveError(err));
    });
