/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import find from 'lodash/find';
import { ItemTypes } from './ItemTypes';
import Box from './Box';
import { ContentFieldPropTypeShape } from '../../../propTypes';

const DroppableContainer = ({
  children,
  className,
  cfActions: { receiveContentField, removeContentField },
  thisPage,
  contentFields: propsContentFields,
}) => {
  const cfByPageSelector = (page) =>
    propsContentFields.filter((ele) => ele.bbox.page === page);

  const contentFields = cfByPageSelector(thisPage);

  const addCF = (cfData, x, y) => {
    receiveContentField({
      ...cfData,
      bbox: {
        ...cfData.bbox,
        x,
        y,
      },
    });
  };
  const moveCF = (cfData, x, y) => {
    receiveContentField({
      ...cfData,
      bbox: {
        ...cfData.bbox,
        x,
        y,
      },
    });
  };

  const [, drop] = useDrop({
    accept: [ItemTypes.BOX, ItemTypes.SIG],
    drop(item, monitor) {
      // console.log(item, monitor);
      const delta = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
      const x = Math.round(item.bbox.x + delta.x);
      const y = Math.round(item.bbox.y + delta.y);

      // debugger;
      if (find(contentFields, (ele) => ele.id === item.id)) {
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
        const { title } = cf;
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Box
            key={cf.id}
            cfData={cf}
            hideSourceOnDrag
            removeContentField={removeContentField}
          >
            <p>
              {/* {title} */}
              Title
            </p>
          </Box>
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
  contentFields: PropTypes.arrayOf(ContentFieldPropTypeShape).isRequired,
  cfActions: PropTypes.shape({
    receiveContentField: PropTypes.func,
    removeContentField: PropTypes.func,
  }).isRequired,
};

export default DroppableContainer;
