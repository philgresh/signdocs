/* eslint-disable no-undef */

export const fetchUsers = () =>
  $.ajax({
    url: `/api/users`,
    method: 'GET',
  });
export const fetchUser = (userId) =>
  $.ajax({
    url: `/api/users/${userId}`,
    method: 'GET',
  });
export const updateUser = (user) =>
  $.ajax({
    url: `/api/users/${user.id}`,
    method: 'POST',
    data: { user },
  });
