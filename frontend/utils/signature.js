export const fetchSignature = (sigId) =>
  $.ajax({
    url: `/api/signature_blocks/${sigId}`,
    method: 'GET',
  });

export const fetchSignatures = () =>
  $.ajax({
    url: `/api/signature_blocks`,
    method: 'GET',
  });

export const updateSignature = (sigData) =>
  $.ajax({
    url: `/api/signature_blocks/${sigData.id}`,
    method: 'PATCH',
    data: sigData,
  });
