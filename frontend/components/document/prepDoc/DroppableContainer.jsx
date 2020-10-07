/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ItemTypes, DraggableBox } from '../shared';
import {
  createContentField,
  updateContentField,
} from '../../../actions/contentFields';
import {
  convertBBOXtoPixels,
  getHeightOfCurrentPage,
  getWidthOfCurrentPage,
} from '../../../utils/contentField';

const getOriginCoords = (type) =>
  document.getElementById(`FIELD-${type}`).getBoundingClientRect();

const getPageCoords = (thisPage) =>
  document
    .querySelector(`[data-page-number="${thisPage}"]`)
    .getBoundingClientRect();

const getContainerCoords = () =>
  document.getElementById('pdf-document-container').getBoundingClientRect();

const getPageDiff = (thisPage) => {
  const pageCoords = getPageCoords(thisPage);
  const containerCoords = getContainerCoords();
  return {
    x: pageCoords.x - containerCoords.x,
    y: pageCoords.y - containerCoords.y,
  };
};

const getContainerFromOrigin = (type) => {
  const originCoords = getOriginCoords(type);
  const containerCoords = getContainerCoords();

  return {
    x: containerCoords.x - originCoords.x,
    y: containerCoords.y - originCoords.y,
  };
};

const getDiff = (type, diff, thisPage) => {
  const pageDiff = getPageDiff(thisPage);
  const containerFromOrigin = getContainerFromOrigin(type);

  return {
    x: diff.x - pageDiff.x - containerFromOrigin.x,
    y: diff.y - pageDiff.y - containerFromOrigin.y,
  };
};

const DroppableContainer = ({ children, className, thisPage }) => {
  const acceptableTypes = [
    ItemTypes.UNFILLED_SIGNATURE,
    ItemTypes.UNFILLED_TEXT,
  ];
  const { docId } = useParams();
  const dispatch = useDispatch();
  const createCF = (cfData) => dispatch(createContentField(cfData));
  const updateCF = (cfData) => dispatch(updateContentField(cfData));

  // TODO: Fix this trash
  const allCFs = useSelector((state) => state.entities.contentFields);
  const contentFields = Object.values(allCFs).filter(
    (ele) => ele.docId === docId && ele.bbox?.page === thisPage,
  );

  const [_collectedProps, drop] = useDrop({
    accept: acceptableTypes,
    drop(item, monitor) {
      // const origin = getOriginCoords(item.type);
      // const pageCoords = getPageCoords(thisPage);
      // const containerCoords = getContainerCoords();
      // const pageDiff = getPageDiff(thisPage);
      // const containerFromOrigin = getContainerFromOrigin(item.type);
      const diff = monitor.getDifferenceFromInitialOffset();
      let delta = diff;
      if (item.bbox.initial) {
        delta = getDiff(item.type, diff, thisPage);
      }

      const pageWidth = getWidthOfCurrentPage(thisPage);
      const pageHeight = getHeightOfCurrentPage(thisPage);
      let newBBOX = convertBBOXtoPixels(
        item.bbox,
        thisPage,
        pageWidth,
        pageHeight,
      );

      let left = newBBOX.left + delta.x;
      let top = newBBOX.top + delta.y;

      left = Math.min(left, pageWidth - newBBOX.width / 2);
      left = Math.max(newBBOX.width / 2, left);

      top = Math.min(top, pageHeight - newBBOX.height / 2);
      top = Math.max(newBBOX.height / 2, top);

      newBBOX = { ...newBBOX, left, top };
      if (allCFs[item.id]) {
        updateCF({ ...item, bbox: newBBOX });
      } else {
        createCF({ ...item, bbox: newBBOX });
      }
      return undefined;
    },
  });

  return (
    <div ref={drop} className={className}>
      {contentFields.map((cf) => {
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <DraggableBox key={cf.id} cfData={cf} thisPage={thisPage} />
        );
      })}
      {children}
    </div>
  );
};

DroppableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string.isRequired,
  thisPage: PropTypes.number.isRequired,
};

export default DroppableContainer;
