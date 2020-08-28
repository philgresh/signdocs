export const getCurrentCanvas = (thisPage) => {
  const pageDiv = $('div').find(`[data-page='${thisPage}']`);
  return pageDiv.find('.react-pdf__Page__canvas');
};

export const getWidthOfCurrentPage = (thisPage) =>
  getCurrentCanvas(thisPage).width();

export const getHeightOfCurrentPage = (thisPage) =>
  getCurrentCanvas(thisPage).height();

export const twoDecimalPrecision = (val) => Math.floor(val * 100) / 100;

// ************ percent to pixels

export const widthPxls = (widthPct, thisPageWidth) =>
  twoDecimalPrecision(widthPct * thisPageWidth);

export const heightPxls = (widthPct, thisPageWidth, aspectRatio) =>
  twoDecimalPrecision(widthPxls(widthPct, thisPageWidth) / aspectRatio);

export const leftPxls = (x, thisPageWidth) =>
  twoDecimalPrecision(x * thisPageWidth);

export const topPxls = (y, thisPageHeight) =>
  twoDecimalPrecision(y * thisPageHeight);

export const convertBBOXtoPixels = (bbox, thisPage) => {
  const thisPageWidth = getWidthOfCurrentPage(thisPage) || 595;
  const thisPageHeight = getHeightOfCurrentPage(thisPage) || 842;
  return {
    ...bbox,
    left: leftPxls(bbox.x, thisPageWidth),
    top: topPxls(bbox.y, thisPageHeight),
    width: widthPxls(bbox.widthPct, thisPageWidth),
    height: heightPxls(bbox.widthPct, thisPageWidth, bbox.aspectRatio),
  };
};

// ************ pixels to percent

export const widthPct = (wPxls, thisPageWidth) =>
  twoDecimalPrecision(wPxls / thisPageWidth);
export const heightPct = (hPxls, thisPageHeight) =>
  twoDecimalPrecision(hPxls / thisPageHeight);
export const x = (left, thisPageWidth) =>
  twoDecimalPrecision(left / thisPageWidth);
export const y = (top, thisPageHeight) =>
  twoDecimalPrecision(top / thisPageHeight);
export const aspectRatio = (wPxls, hPxls) => twoDecimalPrecision(wPxls / hPxls);

export const convertPixelsToBBOX = (bboxPxls, thisPage) => {
  // debugger;

  const thisPageWidth = getWidthOfCurrentPage(thisPage) || 595;
  const thisPageHeight = getHeightOfCurrentPage(thisPage) || 842;
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
    assignee_id: cfData.assigneeId,
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
