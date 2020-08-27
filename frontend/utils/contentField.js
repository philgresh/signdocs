const translateJStoRuby = (cfData) => {
  const newCF = {
    ...cfData,
    assignee_id: cfData.assigneeId,
    document_id: cfData.docId,
  };

  delete newCF.children;
  delete newCF.id;
  return newCF;
};

export const createContentField = (cfData) => {
  return $.ajax({
    url: `/api/content_fields`,
    method: 'POST',
    data: {
      content_field: translateJStoRuby(cfData),
    },
  });
};
export const updateContentField = (cfData) => {
  const { id } = cfData;
  return $.ajax({
    url: `/api/content_fields/${id}`,
    method: 'PATCH',
    data: {
      content_field: translateJStoRuby(cfData),
    },
  });
};
export const deleteContentField = (cfId) =>
  $.ajax({
    url: `/api/content_fields/${cfId}`,
    method: 'DELETE',
  });
