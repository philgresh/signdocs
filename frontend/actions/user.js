import * as APIUtil from '../utils/user';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

// Action creators
const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user,
});

// Thunktions

export const fetchUsers = () => (dispatch) =>
  APIUtil.fetchUsers().then((users) => {
    dispatch(receiveUsers(users));
    return users;
  });
export const fetchUser = (userId) => (dispatch) =>
  APIUtil.fetchUser(userId).then((user) => {
    dispatch(receiveUser(user));
    return user;
  });
export const updateUser = (userForm) => (dispatch) =>
  APIUtil.updateUser(userForm).then((user) => dispatch(receiveUser(user)));
