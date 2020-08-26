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

export const Container = () => {
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
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      if (item.id in boxes) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
      } else {
        setBoxes({
          ...boxes,
          [item.id]: {
            ...item,
          },
        });
      }
      return undefined;
    },
  });

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key];
        return (
          <Box key={key} id={key} left={left} top={top} hideSourceOnDrag>
            {title}
          </Box>
        );
      })}
    </div>
  );
};
