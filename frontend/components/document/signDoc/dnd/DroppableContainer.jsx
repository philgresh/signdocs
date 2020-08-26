/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';
import Box from './Box';

const DroppableContainer = ({
  children,
  className,
  boxes,
  setBoxes,
  thisPage,
}) => {
  const moveBox = (boxData, left, top) => {
    setBoxes((oldState) => ({
      ...oldState,
      [boxData.id]: {
        ...boxData,
        left,
        top,
      },
    }));
  };
  const removeBox = (id) => {
    setBoxes(update(boxes, { $remove: [id] }));
  };
  const [, drop] = useDrop({
    accept: [ItemTypes.BOX, ItemTypes.SIG],
    drop(item, monitor) {
      // console.log(item, monitor);
      const delta = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      // debugger;
      if (item.id in boxes) {
        if (boxes[item.id].page === thisPage) {
          moveBox(item.id, left, top);
        } else {
          removeBox(item.id);
        }
      } else {
        setBoxes({
          ...boxes,
          [item.id]: {
            ...item,
            left,
            top,
            page: thisPage,
          },
        });
      }
      return undefined;
    },
  });

  return (
    <div ref={drop} className={className}>
      {boxes.map((box) => {
        const { title } = box;
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Box key={box.id} boxData={box} hideSourceOnDrag>
            <p>{title}</p>
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
  setBoxes: PropTypes.func.isRequired,
  boxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      left: PropTypes.number,
      top: PropTypes.number,
      page: PropTypes.number,
      hideSourceOnDrag: PropTypes.bool,
      title: PropTypes.string.isRequired,
    }),
  ),
  thisPage: PropTypes.number.isRequired,
};

export default DroppableContainer;
