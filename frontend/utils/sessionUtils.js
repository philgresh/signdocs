/* eslint-disable no-undef */
export const postUser = (user) =>
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

export const onlySignInFields = (formUser) => ({
  email: formUser.email,
  password: formUser.password,
});
