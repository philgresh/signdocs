/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React from 'react';
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
  getDelta,
} from '../../../utils/contentField';

const isUnfilled = (cf) => !!cf.type.match(/^UNFILLED/);

const DroppableContainer = ({ children, className, thisPage }) => {
  const acceptableTypes = [
    ItemTypes.UNFILLED_SIGNATURE,
    ItemTypes.UNFILLED_TEXT,
  ];
  const { docId } = useParams();
  const dispatch = useDispatch();
  const createCF = (cfData) => dispatch(createContentField(cfData));
  const updateCF = (cfData) => dispatch(updateContentField(cfData));

  const allCFs = useSelector((state) => state.entities.contentFields);
  const contentFields = Object.values(allCFs).filter(
    (ele) => ele.docId === docId && ele.bbox?.page === thisPage,
  );

  const [_collectedProps, drop] = useDrop({
    accept: acceptableTypes,
    drop(item, monitor) {
      const diff = monitor.getDifferenceFromInitialOffset();
      let delta = diff;
      if (item.bbox.initial) {
        delta = getDelta(item.type, diff, thisPage);
      }

      const pageWidth = getWidthOfCurrentPage(thisPage);
      const pageHeight = getHeightOfCurrentPage(thisPage);
      let newBBOX = convertBBOXtoPixels(
        item.bbox,
        thisPage,
        pageWidth,
        pageHeight,
      );

      let left = newBBOX.left + delta.x + 8;
      let top = newBBOX.top + delta.y + 8;

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

  const unsignedCfs = contentFields.filter(isUnfilled);

  return (
    <div ref={drop} className={className}>
      {unsignedCfs.map((cf) => {
        return <DraggableBox key={cf.id} cfData={cf} thisPage={thisPage} />;
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
