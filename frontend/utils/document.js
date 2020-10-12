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
export const updateDocument = (docId, formData) =>
  $.ajax({
    url: `/api/documents/${docId}`,
    method: 'PUT',
    data: formData,
    contentType: false,
    processData: false,
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

export const finalizeDocument = (docId) =>
  $.ajax({
    url: `/api/documents/${docId}/finalize`,
    method: 'POST',
  });

export const getSummary = () =>
  $.ajax({
    url: `/api/summary`,
    method: 'GET',
  });
