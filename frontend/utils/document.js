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
export const createDocument = (formData) =>
  $.ajax({
    url: `/api/documents/`,
    method: 'POST',
    data: formData,
    contentType: false,
    processData: false,
  });
export const updateDocument = (doc) =>
  $.ajax({
    url: `/api/documents/${document.id}`,
    method: 'POST',
    data: { document: doc },
  });
export const deleteDocument = (docId) =>
  $.ajax({
    url: `/api/documents/${docId}`,
    method: 'DELETE',
  });

export const fetchSignedUrl = (docId) =>
  $.ajax({
    url: `/api/documents/${docId}/signedurl`,
    method: 'GET',
  });
