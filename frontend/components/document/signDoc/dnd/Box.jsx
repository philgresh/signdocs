/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Box = ({ boxData, children }) => {
  const { left, top, hideSourceOnDrag = false, type = ItemTypes.BOX } = boxData;

  const [{ isDragging }, drag] = useDrag({
    item: { ...boxData, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} className="droppable-item" style={{ left, top }}>
      {children}
    </div>
  );
};

// Box.propTypes = {
//   id: PropTypes.string.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.array,
//     PropTypes.element,
//   ]),
//   left: PropTypes.number,
//   top: PropTypes.number,
//   page: PropTypes.number,
//   hideSourceOnDrag: PropTypes.bool,
// };

// Box.defaultProps = {
//   left: 0,
//   top: 0,
//   page: 1,
//   hideSourceOnDrag: true,
//   children: null,
// };

export default Box;
