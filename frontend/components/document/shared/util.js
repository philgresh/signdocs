export const getCurrentCanvas = (thisPage) => {
  const pageDiv = $('div').find(`[data-page='${thisPage}']`);
  return pageDiv.find('.react-pdf__Page__canvas');
};

export const getWidthOfCurrentPage = (thisPage) =>
  getCurrentCanvas(thisPage).width();

export const widthPxls = (widthPct, thisPage) =>
  Math.floor(widthPct * getWidthOfCurrentPage(thisPage) * 100) / 100;

export const heightPxls = (widthPct, thisPage, aspectRatio) =>
  Math.floor((widthPxls(widthPct, thisPage) / aspectRatio) * 100) / 100;

export const leftPxls = (x, thisPage) =>
  Math.floor(x * getWidthOfCurrentPage(thisPage) * 100) / 100;

export const topPxls = (y, thisPage) =>
  Math.floor(y * getWidthOfCurrentPage(thisPage) * 100) / 100;
