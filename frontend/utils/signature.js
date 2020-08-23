export const fetchSignature = (userId) =>
  $.ajax({
    url: `/api/signature_blocks/${userId}`,
    method: 'GET',
  });

export const fetchSignatures = () =>
  $.ajax({
    url: `/api/signature_blocks`,
    method: 'GET',
  });

export const updateSignature = (sigData) =>
  $.ajax({
    url: `/api/signature_blocks/${sigData.userId}`,
    method: 'PATCH',
    data: {
      signature: sigData,
    },
  });
