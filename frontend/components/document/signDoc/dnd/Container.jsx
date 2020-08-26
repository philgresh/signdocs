/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';
import { Box } from './Box';

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
};

export const Container = ({ children, className }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  });
  const moveBox = (id, left, top) => {
    setBoxes(
      update(boxes, {
        [id]: {
          $merge: { left, top },
        },
      }),
    );
  };
  const [, drop] = useDrop({
    accept: [ItemTypes.BOX, ItemTypes.SIG],
    drop(item, monitor) {
      // console.log(item, monitor);
      const delta = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      if (item.id in boxes) {
        moveBox(item.id, left, top);
      } else {
        setBoxes({
          ...boxes,
          [item.id]: {
            ...item,
            left,
            top,
          },
        });
      }
      return undefined;
    },
  });

  return (
    <div ref={drop} className={className}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key];
        return (
          <Box key={key} id={key} left={left} top={top} hideSourceOnDrag>
            {title}
          </Box>
        );
      })}
      {children}
    </div>
  );
};
