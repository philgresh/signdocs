/* eslint-disable no-undef */
export const createUser = (user) =>
  $.ajax({
    url: '/api/users',
    method: 'POST',
    data: { user },
  });

export const postSession = (user) =>
  $.ajax({
    url: '/api/session',
    method: 'POST',
    data: { user },
  });

export const deleteSession = () =>
  $.ajax({
    url: '/api/session',
    method: 'DELETE',
  });

export const forgottenPassword = (email) =>
  $.ajax({
    url: '/api/session/forgotten',
    method: 'POST',
    data: {
      email,
    },
  });

export const resetPassword = ({ password, resetToken }) =>
  $.ajax({
    url: '/api/session/reset',
    method: 'POST',
    data: {
      password,
      resetToken,
    },
  });

export const onlySignInFields = (formUser) => ({
  email: formUser.email,
  password: formUser.password,
});
