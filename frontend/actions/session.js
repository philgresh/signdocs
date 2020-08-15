import { postUser, postSession, deleteSession } from '../utils/sessionUtils';

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
  payload: errors,
  type: RECEIVE_ERRORS,
});

// Thunk action creators
export const createNewUser = (formUser) => (dispatch) =>
  postUser(formUser)
    .then((user) => {
      dispatch(receiveCurrentUser(user));
    })
    .catch((err) => dispatch(receiveErrors(err)));

export const signinUser = (formUser) => (dispatch) => {
  debugger;
  return postSession(formUser)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .catch((err) => dispatch(receiveErrors(err)));
};

export const signoutUser = () => (dispatch) =>
  deleteSession()
    .then(() => dispatch(signoutCurrentUser()))
    .catch((err) => dispatch(receiveErrors(err)));
