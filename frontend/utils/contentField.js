const translateJStoRuby = (cfData) => {
  const { docId, bbox, type, assigneeId } = cfData;
  return {
    ...cfData,
    type,
    bbox,
    assignee_id: assigneeId,
    document_id: docId,
  };
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
