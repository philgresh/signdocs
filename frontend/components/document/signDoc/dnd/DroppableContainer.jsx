/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import find from 'lodash/find';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemTypes from '../ItemTypes';
import ContentField from './PrepareContentField';
import {
  createContentField,
  updateContentField,
} from '../../../../actions/contentFields';

const DroppableContainer = ({
  children,
  className,
  thisPage,
  context = 'PREPARE',
}) => {
  let acceptableTypes = [];
  if (context === 'PREPARE') {
    acceptableTypes = [ItemTypes.UNFILLED_SIGNATURE, ItemTypes.UNFILLED_TEXT];
  }
  const { docId } = useParams();
  const dispatch = useDispatch();
  const createCF = (cfData) => dispatch(createContentField(cfData));
  const updateCF = (cfData) => dispatch(updateContentField(cfData));

  // TODO: Fix this trash
  const allCFs = useSelector((state) => state.entities.contentFields);
  const contentFields = Object.values(allCFs).filter(
    (ele) => ele.docId === docId && ele.bbox?.page === thisPage,
  );

  const addCF = (cfData, x, y) => {
    createCF({
      ...cfData,
      bbox: {
        ...cfData.bbox,
        x,
        y,
        page: thisPage,
      },
    });
  };
  const moveCF = (cfData, x, y) => {
    updateCF({
      ...cfData,
      bbox: {
        ...cfData.bbox,
        x,
        y,
        page: thisPage,
      },
    });
  };

  const [, drop] = useDrop({
    accept: acceptableTypes,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
      const x = Math.max(0, Math.round(item.bbox.x + delta.x));
      const y = Math.max(0, Math.round(item.bbox.y + delta.y));
      if (allCFs[item.id]) {
        moveCF(item, x, y);
      } else {
        addCF(item, x, y);
      }
      return undefined;
    },
  });

  return (
    <div ref={drop} className={className}>
      {contentFields.map((cf) => {
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ContentField key={cf.id} cfData={cf} hideSourceOnDrag />
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
  context: PropTypes.oneOf(['PREPARE', 'SIGN']).isRequired,
};

export default DroppableContainer;
