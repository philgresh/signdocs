export const getCurrentCanvas = (thisPage) => {
  const pageDiv = $('div').find(`[data-page='${thisPage}']`);
  return pageDiv.find('.react-pdf__Page__canvas');
};

export const getWidthOfCurrentPage = (thisPage) =>
  getCurrentCanvas(thisPage).width();

export const width = (widthPct, thisPage) =>
  Math.floor(widthPct * getWidthOfCurrentPage(thisPage) * 100) / 100;

export const height = (widthPxls, aspectRatio) =>
  Math.floor((widthPxls / aspectRatio) * 100) / 100;
