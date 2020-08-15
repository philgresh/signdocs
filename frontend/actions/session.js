import * as APIUtil from '../utils/session';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const SIGNOUT_CURRENT_USER = 'SIGNOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

// Action creators
const receiveCurrentUser = (user) => ({
  payload: user,
  type: RECEIVE_CURRENT_USER,
});

const signoutCurrentUser = () => ({
  type: SIGNOUT_CURRENT_USER,
});

const receiveErrors = (errors) => ({
  payload: errors.responseJSON,
  type: RECEIVE_ERRORS,
});

// Thunk action creators
export const createNewUser = (formUser) => (dispatch) =>
  APIUtil.postUser(formUser)
    .then((user) => {
      dispatch(receiveCurrentUser(user));
    })
    .fail((err) => dispatch(receiveErrors(err)));

export const signinUser = (formUser) => (dispatch) =>
  APIUtil.postSession(formUser)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .fail((err) => dispatch(receiveErrors(err)));

export const signoutUser = () => (dispatch) =>
  APIUtil.deleteSession()
    .then(() => dispatch(signoutCurrentUser()))
    .fail((err) => dispatch(receiveErrors(err)));
