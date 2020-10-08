export const getCurrentCanvas = (thisPage) => {
  const pageDiv = $('div').find(`[data-page='${thisPage}']`);
  return pageDiv.find('.react-pdf__Page__canvas');
};

export const getWidthOfCurrentPage = (thisPage) =>
  getCurrentCanvas(thisPage).width();

export const getHeightOfCurrentPage = (thisPage) =>
  getCurrentCanvas(thisPage).height();

export const threeDecimalPrecision = (val) => Math.floor(val * 1000) / 1000;

export const getOriginCoords = (type) =>
  document.getElementById(`FIELD-${type}`).getBoundingClientRect();

export const getPageCoords = (thisPage) =>
  document
    .querySelector(`[data-page-number="${thisPage}"]`)
    .getBoundingClientRect();

export const getContainerCoords = () =>
  document.getElementById('pdf-document-container').getBoundingClientRect();

export const getPageDiff = (thisPage) => {
  const pageCoords = getPageCoords(thisPage);
  const containerCoords = getContainerCoords();
  return {
    x: pageCoords.x - containerCoords.x,
    y: pageCoords.y - containerCoords.y,
  };
};

export const getContainerFromOrigin = (type) => {
  const originCoords = getOriginCoords(type);
  const containerCoords = getContainerCoords();

  return {
    x: containerCoords.x - originCoords.x,
    y: containerCoords.y - originCoords.y,
  };
};

export const getDelta = (type, diff, thisPage) => {
  const pageDiff = getPageDiff(thisPage);
  const containerFromOrigin = getContainerFromOrigin(type);

  return {
    x: diff.x - pageDiff.x - containerFromOrigin.x,
    y: diff.y - pageDiff.y - containerFromOrigin.y,
  };
};

// ************ percent to pixels

export const widthPxls = (widthPct, thisPageWidth) =>
  threeDecimalPrecision(widthPct * thisPageWidth);

export const heightPxls = (widthPct, thisPageWidth, aspectRatio) =>
  threeDecimalPrecision(widthPxls(widthPct, thisPageWidth) / aspectRatio);

export const leftPxls = (x, thisPageWidth) =>
  threeDecimalPrecision(x * thisPageWidth);

export const topPxls = (y, thisPageHeight) =>
  threeDecimalPrecision(y * thisPageHeight);

export const convertBBOXtoPixels = (bbox, thisPage) => {
  const thisPageWidth = getWidthOfCurrentPage(thisPage) || 612;
  const thisPageHeight = getHeightOfCurrentPage(thisPage) || 792;
  return {
    ...bbox,
    page: thisPage,
    left: leftPxls(bbox.x, thisPageWidth),
    top: topPxls(bbox.y, thisPageHeight),
    width: widthPxls(bbox.widthPct, thisPageWidth),
    height: heightPxls(bbox.widthPct, thisPageWidth, bbox.aspectRatio),
  };
};

// ************ pixels to percent

export const widthPct = (wPxls, thisPageWidth) =>
  threeDecimalPrecision(wPxls / thisPageWidth);
export const heightPct = (hPxls, thisPageHeight) =>
  threeDecimalPrecision(hPxls / thisPageHeight);
export const x = (left, thisPageWidth) =>
  threeDecimalPrecision(left / thisPageWidth);
export const y = (top, thisPageHeight) =>
  threeDecimalPrecision(top / thisPageHeight);
export const aspectRatio = (wPxls, hPxls) =>
  threeDecimalPrecision(wPxls / hPxls);

export const convertPixelsToBBOX = (
  bboxPxls,
  thisPage,
  pageWidth,
  pageHeight,
) => {
  const thisPageWidth = pageWidth || getWidthOfCurrentPage(thisPage);
  const thisPageHeight = pageHeight || getHeightOfCurrentPage(thisPage);
  return {
    ...bboxPxls,
    x: x(bboxPxls.left, thisPageWidth),
    y: y(bboxPxls.top, thisPageHeight),
    widthPct: widthPct(bboxPxls.width, thisPageWidth),
    aspectRatio: aspectRatio(bboxPxls.width, bboxPxls.height),
    page: thisPage,
  };
};

const translateJStoRuby = (cfData) => {
  const newBBOX = {
    ...cfData.bbox,
    ...convertPixelsToBBOX(cfData.bbox, cfData.bbox.page),
  };
  const newCF = {
    ...cfData,
    signatory_id: cfData.signatoryId,
    document_id: cfData.docId,
    bbox: {
      ...newBBOX,
      aspect_ratio: newBBOX.aspectRatio,
      width_pct: newBBOX.widthPct,
    },
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

export const signContentField = (cfId) =>
  $.ajax({
    url: `/api/content_fields/${cfId}/sign`,
    method: 'POST',
  });
