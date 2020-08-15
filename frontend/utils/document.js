/* eslint-disable no-undef */
export const fetchDocuments = () =>
  $.ajax({
    url: `/api/documents/`,
    method: 'GET',
  });
export const fetchDocument = (docId) =>
  $.ajax({
    url: `/api/documents/${docId}`,
    method: 'GET',
  });
export const createDocument = (document) =>
  $.ajax({
    url: `/api/documents/`,
    method: 'POST',
    data: { document },
  });
export const updateDocument = (document) =>
  $.ajax({
    url: `/api/documents/${document.id}`,
    method: 'POST',
    data: { document },
  });
export const deleteDocument = (docId) =>
  $.ajax({
    url: `/api/documents/${docId}`,
    method: 'DELETE',
  });
